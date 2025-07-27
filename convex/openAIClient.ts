// OpenAI client for Daily Digest generation with structured output

interface DigestSchema {
  type: "object";
  properties: {
    title: {
      type: "string";
      description: "Title for the daily digest in format: Daily Immigration & Education Digest - Month DD, YYYY";
    };
    summary: {
      type: "string";
      description: "Brief 150-200 character summary of what's covered in today's digest";
    };
    content: {
      type: "string";
      description: "Full digest content in markdown format, organized by category with summaries of each news item";
    };
    keyTakeaways: {
      type: "array";
      items: {
        type: "string";
      };
      description: "3-5 key points from today's digest";
    };
    tags: {
      type: "array";
      items: {
        type: "string";
      };
      description: "5-8 relevant tags including 'daily-digest' as the first tag";
    };
    categories: {
      type: "array";
      items: {
        type: "string";
      };
      description: "Categories covered in this digest (immigration, education, visa, etc.)";
    };
  };
  required: ["title", "summary", "content", "keyTakeaways", "tags", "categories"];
  additionalProperties: false;
}

export const DIGEST_SCHEMA: DigestSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Title for the daily digest in format: Daily Immigration & Education Digest - Month DD, YYYY",
    },
    summary: {
      type: "string",
      description: "Brief 150-200 character summary of what's covered in today's digest",
    },
    content: {
      type: "string",
      description: "Full digest content in markdown format, organized by category with summaries of each news item",
    },
    keyTakeaways: {
      type: "array",
      items: {
        type: "string",
      },
      description: "3-5 key points from today's digest",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
      description: "5-8 relevant tags including 'daily-digest' as the first tag",
    },
    categories: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Categories covered in this digest (immigration, education, visa, etc.)",
    },
  },
  required: ["title", "summary", "content", "keyTakeaways", "tags", "categories"],
  additionalProperties: false,
};

export interface DigestResponse {
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  tags: string[];
  categories: string[];
}

export async function generateDigestWithOpenAI(
  prompt: string,
  apiKey: string
): Promise<DigestResponse> {
  const messages = [
    {
      role: "system",
      content: `You are an expert news digest writer specializing in immigration and education content for Indians living abroad or planning to move abroad. Your role is to create comprehensive, narrative-driven daily digests that connect individual news items into broader trends and insights.

Your expertise includes:
- Immigration policies and visa regulations across major destination countries
- International education systems and opportunities
- Career prospects and job markets for Indian professionals abroad
- Cultural integration and diaspora community developments
- Success stories and achievements of Indians internationally

Writing style:
- Professional yet accessible and engaging
- Focus on storytelling that connects disparate news items
- Provide context and analysis, not just summaries
- Include practical, actionable advice for readers
- Use data and statistics to support key points
- Maintain an optimistic but realistic tone

Content priorities:
- Filter rigorously - only include news directly relevant to Indians abroad
- Emphasize practical impact on readers' lives
- Highlight opportunities and important deadlines
- Connect individual stories to broader immigration/education trends
- Provide clear takeaways and next steps for readers

You must generate valid JSON that exactly matches the provided schema, with particular attention to creating flowing, narrative content in the 'content' field that reads like a cohesive article, not a collection of summaries.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-2024-07-18",
        messages,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "digest",
            strict: true,
            schema: DIGEST_SCHEMA,
          },
        },
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Invalid response structure from OpenAI");
    }

    // Parse the JSON response
    const digestResponse = JSON.parse(data.choices[0].message.content) as DigestResponse;
    
    // Validate the response has all required fields
    if (!digestResponse.title || !digestResponse.summary || !digestResponse.content ||
        !digestResponse.keyTakeaways || !digestResponse.tags || !digestResponse.categories) {
      throw new Error("Missing required fields in digest response");
    }

    // Ensure daily-digest is the first tag
    if (!digestResponse.tags.includes("daily-digest")) {
      digestResponse.tags.unshift("daily-digest");
    }

    return digestResponse;
    
  } catch (error) {
    console.error("Error generating digest with OpenAI:", error);
    throw error;
  }
}