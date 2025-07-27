// OpenRouter client for Google Gemma integration with structured output

interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

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
    keyHighlights: {
      type: "array";
      items: {
        type: "string";
      };
      description: "3-5 most important highlights from today's digest";
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
  required: ["title", "summary", "content", "keyHighlights", "tags", "categories"];
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
    keyHighlights: {
      type: "array",
      items: {
        type: "string",
      },
      description: "3-5 most important highlights from today's digest",
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
  required: ["title", "summary", "content", "keyHighlights", "tags", "categories"],
};

export interface DigestResponse {
  title: string;
  summary: string;
  content: string;
  keyHighlights: string[];
  tags: string[];
  categories: string[];
}

export async function generateDigestWithGemma(
  prompt: string,
  apiKey: string
): Promise<DigestResponse> {
  const messages: OpenRouterMessage[] = [
    {
      role: "system",
      content: `You are a news digest AI that creates daily summaries of immigration and education news specifically relevant to Indians living abroad or planning to move abroad. 
      
Focus on:
- Visa policy changes and updates
- Immigration rule modifications
- Education opportunities and scholarships
- Career prospects and job market updates
- Success stories of Indians abroad
- Important deadlines and announcements

Filter out content that is:
- Not relevant to Indians
- Generic news without immigration/education angle
- Outdated information
- Duplicate stories

Write in a professional yet accessible tone, providing actionable insights where possible.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://indiansabroad.com",
        "X-Title": "Indians Abroad Daily Digest",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
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
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Invalid response structure from OpenRouter");
    }

    // Parse the JSON response
    const digestResponse = JSON.parse(data.choices[0].message.content) as DigestResponse;
    
    // Validate the response has all required fields
    if (!digestResponse.title || !digestResponse.summary || !digestResponse.content ||
        !digestResponse.keyHighlights || !digestResponse.tags || !digestResponse.categories) {
      throw new Error("Missing required fields in digest response");
    }

    // Ensure daily-digest is the first tag
    if (!digestResponse.tags.includes("daily-digest")) {
      digestResponse.tags.unshift("daily-digest");
    }

    return digestResponse;
    
  } catch (error) {
    console.error("Error generating digest with Gemma:", error);
    throw error;
  }
}