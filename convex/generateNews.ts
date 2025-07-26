import { internalMutation, internalAction, action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Default topics for automatic generation when no scheduled article exists
const DEFAULT_TOPICS = [
  {
    category: "immigration",
    prompt: "Latest immigration policy updates and changes affecting Indians moving abroad, including visa processing times, new requirements, and policy announcements from major destination countries"
  },
  {
    category: "education", 
    prompt: "New educational opportunities, scholarship announcements, university partnerships, and study abroad programs specifically beneficial for Indian students"
  },
  {
    category: "visa",
    prompt: "Recent changes in visa processes, new visa categories, processing improvements, and important updates for various visa types for Indians"
  },
  {
    category: "career",
    prompt: "International job market trends, in-demand skills abroad, career opportunities, and professional development for Indians working internationally"
  },
  {
    category: "success",
    prompt: "Recent success stories and achievements of Indians abroad, including notable accomplishments in business, technology, academia, and other fields"
  },
  {
    category: "culture",
    prompt: "Cultural integration tips, community events, Indian diaspora news, and cross-cultural experiences for Indians living abroad"
  }
];

// JSON Schema for structured output from Perplexity
const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "Brief 150-200 character summary"
    },
    content: {
      type: "string", 
      description: "Main article content in markdown format - detailed and comprehensive"
    },
    keyTakeaways: {
      type: "array",
      items: {
        type: "string"
      },
      description: "3-5 key points from the article"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      },
      description: "5 relevant tags for the article"
    }
  },
  required: ["summary", "content", "keyTakeaways", "tags"]
};

// Parse tag-based response format
function parseTaggedResponse(response: string): {
  title?: string;
  summary?: string;
  content?: string;
  keyTakeaways?: string[];
  tags?: string[];
} | null {
  try {
    const result: any = {};
    
    // Extract content after </think> tag if present
    let content = response;
    const thinkEndIndex = response.lastIndexOf('</think>');
    if (thinkEndIndex !== -1) {
      content = response.substring(thinkEndIndex + 8).trim();
    }
    
    // Extract Title
    const titleMatch = content.match(/<Title>([\s\S]*?)<\/Title>/i);
    if (titleMatch) {
      result.title = titleMatch[1].trim();
    }
    
    // Extract Summary
    const summaryMatch = content.match(/<Summary>([\s\S]*?)<\/Summary>/i);
    if (summaryMatch) {
      result.summary = summaryMatch[1].trim();
    }
    
    // Extract Content
    const contentMatch = content.match(/<Content>([\s\S]*?)<\/Content>/i);
    if (contentMatch) {
      result.content = contentMatch[1].trim();
    }
    
    // Extract Key Takeaways
    const keyTakeawaysMatch = content.match(/<KeyTakeaways>([\s\S]*?)<\/KeyTakeaways>/i);
    if (keyTakeawaysMatch) {
      // Split by newlines and filter empty lines
      result.keyTakeaways = keyTakeawaysMatch[1]
        .split(/[\n\r]+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    
    // Extract Tags
    const tagsMatch = content.match(/<Tags>([\s\S]*?)<\/Tags>/i);
    if (tagsMatch) {
      // Split by commas
      result.tags = tagsMatch[1]
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    }
    
    // Validate we have the minimum required fields
    if (!result.content || !result.summary) {
      console.error('Missing required fields in tagged response');
      return null;
    }
    
    return result;
  } catch (error) {
    console.error('Error parsing tagged response:', error);
    return null;
  }
}

// Convert content to markdown format
function convertToMarkdown(content: string): string {
  let markdown = content;
  
  // Convert HTML-style headings to markdown
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, '# $1');
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, '## $1');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, '### $1');
  
  // Convert bold
  markdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
  
  // Convert italic
  markdown = markdown.replace(/<i>(.*?)<\/i>/gi, '*$1*');
  markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*');
  
  // Replace //n with actual newlines
  markdown = markdown.replace(/\/\/n/g, '\n');
  
  return markdown;
}

// Clean content from AI artifacts and ensure proper formatting
function cleanArticleContent(content: string): string {
  let cleaned = content;
  
  // Remove internal reasoning markers like <*...>
  cleaned = cleaned.replace(/<\*[^>]*>/g, '');
  
  // Remove editorial notes in square brackets that aren't citations
  // Keep [1], [2], etc. but remove [Note: ...] or [Editorial: ...]
  cleaned = cleaned.replace(/\[[^\]]*(?:Note|Editorial|Comment|TODO|FIXME)[^\]]*\]/gi, '');
  
  // Remove any remaining <think> tags or similar
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '');
  cleaned = cleaned.replace(/<\/?think>/g, '');
  
  // Detect and remove corrupted endings (random characters, code fragments)
  // Look for suspicious patterns at the end
  const lines = cleaned.split('\n');
  let lastValidLine = lines.length - 1;
  
  // Check from the end for corrupted content
  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 10); i--) {
    const line = lines[i].trim();
    // Detect corruption patterns: excessive special chars, random Unicode, code syntax
    if (line.length > 0 && (
      /[\u0400-\u04FF]{5,}/.test(line) || // Cyrillic spam
      /[\u4E00-\u9FFF]{5,}/.test(line) || // Chinese characters spam  
      /[{}\[\]()<>]{10,}/.test(line) || // Code syntax spam
      /\w{50,}/.test(line) || // Very long unbroken strings
      /[^\x20-\x7E\n\r\t]{10,}/.test(line) // Non-printable characters
    )) {
      lastValidLine = i - 1;
    } else if (line.length > 0) {
      // Found a valid line, stop checking
      break;
    }
  }
  
  // Truncate at last valid line if corruption detected
  if (lastValidLine < lines.length - 1) {
    cleaned = lines.slice(0, lastValidLine + 1).join('\n');
  }
  
  // Ensure content doesn't end mid-sentence
  cleaned = cleaned.trim();
  const lastChar = cleaned[cleaned.length - 1];
  if (lastChar && !'.!?"\'`)'.includes(lastChar)) {
    // Try to find the last complete sentence
    const lastPeriodIndex = cleaned.lastIndexOf('.');
    const lastExclamationIndex = cleaned.lastIndexOf('!');
    const lastQuestionIndex = cleaned.lastIndexOf('?');
    const lastCompleteIndex = Math.max(lastPeriodIndex, lastExclamationIndex, lastQuestionIndex);
    
    if (lastCompleteIndex > cleaned.length * 0.8) {
      // Only truncate if we're not losing too much content
      cleaned = cleaned.substring(0, lastCompleteIndex + 1);
    }
  }
  
  return cleaned.trim();
}

// Calculate reading time based on content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Generate news article using custom title and optional prompt
export const generateNewsArticle = internalAction({
  args: {
    title: v.string(), // Admin-provided title
    category: v.string(), // Article category
    customPrompt: v.optional(v.string()), // Optional custom prompt
    scheduledArticleId: v.optional(v.id("scheduledArticles")), // Link to scheduled article
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    articleId: string;
    title: string;
    category: string;
  }> => {
    try {
      // Build the research prompt
      let basePrompt = args.customPrompt;
      
      if (!basePrompt) {
        // Use default topic prompt if no custom prompt provided
        const defaultTopic = DEFAULT_TOPICS.find(t => t.category === args.category);
        basePrompt = defaultTopic ? defaultTopic.prompt : 
          "Recent news and developments affecting Indians living abroad or planning to move abroad";
      }

      const prompt = `Research and write a comprehensive news article with the title: "${args.title}"

The article should focus on: ${basePrompt}

RESEARCH REQUIREMENTS:
- Include specific data, statistics, and recent facts (last 6 months)
- Mention relevant Indian government policies and international agreements
- Include practical advice and actionable steps
- Reference official sources like government websites, embassy announcements, and credible news outlets
- Focus on information valuable to Indians abroad or planning to move
- Ensure the content matches and supports the given title

CONTENT REQUIREMENTS:
- Write in an informative yet engaging tone
- Target length: 1000-1500 words (comprehensive but focused)
- Use standard markdown formatting:
  - ## for main headings
  - ### for subheadings
  - **bold** for emphasis
  - *italics* for foreign terms
  - > for important quotes
  - - or * for bullet points
  - [text](url) for links
- AVOID TABLES - use bullet points for data presentation instead

OUTPUT FORMAT:
Return a JSON object with the following fields:
- summary: A compelling 150-200 character summary
- content: The main article content in markdown format
- keyTakeaways: An array of 3-5 key points from the article
- tags: An array of 5 relevant tags

CRITICAL RULES:
- The content field should contain ONLY the article text, no metadata
- Keep all sections complete - do not cut off mid-sentence
- Focus on comprehensive, factual reporting
- Ensure the article directly addresses the title: "${args.title}"
- DO NOT include "Key Takeaways" or "Tags" sections in the content itself
- These will be handled separately in the JSON structure`;

      console.log(`Generating article with title: "${args.title}" for category: ${args.category}`);
      
      // Call Perplexity API
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            { role: "user", content: prompt }
          ],
          response_format: {
            type: "json_schema",
            json_schema: { schema: ARTICLE_SCHEMA }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Perplexity response received');

      const aiResponse = data.choices[0]?.message?.content;
      if (!aiResponse) {
        throw new Error('No response content from Perplexity');
      }

      console.log('AI Response length:', aiResponse.length);
      console.log('AI Response preview:', aiResponse.substring(0, 500));

      // Parse the JSON response
      let parsedArticle;
      try {
        parsedArticle = JSON.parse(aiResponse);
      } catch (error) {
        console.error('Failed to parse JSON response:', error);
        console.error('Full response:', aiResponse);
        // Save the failed response for debugging
        const errorId = await ctx.runMutation(internal.news.createInternal, {
          title: `PARSE_ERROR: ${args.title}`,
          content: `Failed to parse AI response. See rawOutput for details.`,
          summary: 'Parsing error',
          category: args.category,
          tags: ['error', 'parsing-failed'],
          metadata: {
            error: 'Failed to parse JSON response',
            timestamp: new Date().toISOString(),
          },
          status: 'error',
          generatedAt: Date.now(),
          isActive: false,
          readingTime: 0,
          rawOutput: aiResponse,
        });
        throw new Error(`Failed to parse JSON response. Debug article ID: ${errorId}`);
      }

      // Validate required fields
      if (!parsedArticle.content || !parsedArticle.summary) {
        throw new Error('Missing required fields in parsed article');
      }

      // Clean the content and summary
      const cleanedContent = cleanArticleContent(parsedArticle.content);
      const cleanedSummary = cleanArticleContent(parsedArticle.summary);

      // Validate cleaned content
      if (cleanedContent.length < 100) {
        throw new Error('Article content too short after cleaning - possible corruption');
      }

      if (cleanedSummary.length < 50) {
        throw new Error('Article summary too short after cleaning');
      }

      // Calculate reading time
      const readingTime = calculateReadingTime(cleanedContent);

      // Create metadata object with Perplexity citations
      const metadata = {
        keyTakeaways: parsedArticle.keyTakeaways || [],
        sources: data.citations ? data.citations.map((url: string, index: number) => ({
          source: `Source ${index + 1}`,
          url: url
        })) : [],
        searchResults: data.search_results || [],
        generatedBy: 'Perplexity Sonar Reasoning',
        generatedAt: new Date().toISOString(),
        usage: data.usage,
        scheduledArticleId: args.scheduledArticleId, // Link back to scheduled article
        customPrompt: args.customPrompt || null
      };

      // Store the article in the database
      const articleId: string = await ctx.runMutation(internal.news.createInternal, {
        title: args.title, // Use the admin-provided title
        content: cleanedContent, // Use cleaned content
        summary: cleanedSummary, // Use cleaned summary
        category: args.category,
        tags: parsedArticle.tags || [],
        metadata,
        status: 'draft', // Start as draft for review
        generatedAt: Date.now(),
        isActive: true,
        readingTime,
        rawOutput: aiResponse,
      });

      // Update scheduled article if linked
      if (args.scheduledArticleId) {
        await ctx.runMutation(internal.scheduledArticles.updateScheduledArticle, {
          id: args.scheduledArticleId,
          status: 'completed',
          generatedArticleId: articleId as Id<"newsArticles">,
        });
      }

      console.log(`Article created with ID: ${articleId}`);
      
      return {
        success: true,
        articleId,
        title: args.title,
        category: args.category,
      };

    } catch (error) {
      console.error('Error generating news article:', error);
      
      // Update scheduled article as failed if linked
      if (args.scheduledArticleId) {
        try {
          await ctx.runMutation(internal.scheduledArticles.updateScheduledArticle, {
            id: args.scheduledArticleId,
            status: 'failed',
            metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
          });
        } catch (updateError) {
          console.error('Failed to update scheduled article status:', updateError);
        }
      }
      
      throw new Error(`Failed to generate news article: ${error}`);
    }
  },
});

// Process scheduled articles - called by cron job
export const processScheduledArticles = internalAction({
  args: {},
  handler: async (ctx): Promise<{
    processed: number;
    successful: number;
    failed: number;
    results: Array<{
      scheduledId: string;
      title: string;
      status: 'completed' | 'failed';
      articleId?: string;
      error?: string;
    }>;
  }> => {
    try {
      console.log('Processing scheduled articles...');
      
      // Get all pending scheduled articles that are due
      const now = Date.now();
      const dueArticles = await ctx.runQuery(internal.scheduledArticles.getDueScheduledArticles, {
        currentTime: now
      });

      const results: Array<{
        scheduledId: string;
        title: string;
        status: 'completed' | 'failed';
        articleId?: string;
        error?: string;
      }> = [];

      let successful = 0;
      let failed = 0;

      for (const scheduled of dueArticles) {
        try {
          console.log(`Processing scheduled article: "${scheduled.title}"`);
          
          // Mark as processing
          await ctx.runMutation(internal.scheduledArticles.updateScheduledArticle, {
            id: scheduled._id,
            status: 'processing',
          });

          // Generate the article
          const result = await ctx.runAction(internal.generateNews.generateNewsArticle, {
            title: scheduled.title,
            category: scheduled.category,
            customPrompt: scheduled.customPrompt,
            scheduledArticleId: scheduled._id,
          });

          results.push({
            scheduledId: scheduled._id,
            title: scheduled.title,
            status: 'completed',
            articleId: result.articleId,
          });

          successful++;
          console.log(`✅ Successfully generated: "${scheduled.title}"`);

        } catch (error) {
          console.error(`❌ Failed to generate: "${scheduled.title}"`, error);
          
          results.push({
            scheduledId: scheduled._id,
            title: scheduled.title,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          });

          failed++;
        }
      }

      console.log(`Scheduled articles processing complete: ${successful} successful, ${failed} failed`);

      return {
        processed: dueArticles.length,
        successful,
        failed,
        results,
      };

    } catch (error) {
      console.error('Error processing scheduled articles:', error);
      throw error;
    }
  },
});

// Legacy cron job handler - now checks for scheduled articles first
export const cronGenerateNews = internalAction({
  args: {},
  handler: async (ctx): Promise<{
    success: boolean;
    articleId?: string;
    title?: string;
    category?: string;
    scheduledProcessed?: number;
  }> => {
    try {
      console.log('Cron job started - checking for scheduled articles first...');
      
      // First, process any scheduled articles
      const scheduledResult = await ctx.runAction(internal.generateNews.processScheduledArticles, {});
      
      if (scheduledResult.processed > 0) {
        console.log(`Processed ${scheduledResult.processed} scheduled articles`);
        return {
          success: true,
          scheduledProcessed: scheduledResult.processed,
        };
      }

      // If no scheduled articles, fall back to automatic generation
      console.log('No scheduled articles found, generating automatic article...');
      
      const now = new Date();
      const dayOfMonth = now.getDate();
      const topicIndex = Math.floor((dayOfMonth - 1) / 5) % DEFAULT_TOPICS.length;
      const topic = DEFAULT_TOPICS[topicIndex];
      
      // Generate automatic title based on category and date
      const autoTitle = `${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)} Update: ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      
      const result = await ctx.runAction(internal.generateNews.generateNewsArticle, {
        title: autoTitle,
        category: topic.category,
        customPrompt: topic.prompt,
      });
      
      console.log('Automatic cron job completed successfully:', result);
      
      return {
        success: true,
        articleId: result.articleId,
        title: result.title,
        category: result.category,
      };
    } catch (error) {
      console.error('Cron job failed:', error);
      throw error;
    }
  },
});

// Manual generation with custom title (for admin interface)
export const manualGenerateNews = internalAction({
  args: {
    title: v.string(),
    category: v.string(),
    customPrompt: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    articleId: string;
    title: string;
    category: string;
  }> => {
    console.log(`Manual generation started: "${args.title}" in ${args.category}`);
    
    const result = await ctx.runAction(internal.generateNews.generateNewsArticle, {
      title: args.title,
      category: args.category,
      customPrompt: args.customPrompt,
    });
    
    return result;
  },
});

// Public version for testing
export const testGenerateNews = action({
  args: {
    title: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    articleId: string;
    title: string;
    category: string;
  }> => {
    const title = args.title || `Test Article: ${new Date().toLocaleDateString()}`;
    const category = args.category || 'immigration';
    
    console.log(`Test generation started: "${title}" in ${category}`);
    
    const result = await ctx.runAction(internal.generateNews.generateNewsArticle, {
      title,
      category,
    });
    
    return result;
  },
});

// Get available categories
export const getAvailableCategories = internalAction({
  args: {},
  handler: async (): Promise<Array<{
    category: string;
    description: string;
  }>> => {
    return DEFAULT_TOPICS.map(topic => ({
      category: topic.category,
      description: topic.prompt,
    }));
  },
});