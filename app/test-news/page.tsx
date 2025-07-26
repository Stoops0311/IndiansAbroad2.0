"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestNewsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createArticle = useMutation(api.news.create);
  const generateNews = useAction(api.generateNews.testGenerateNews);

  const handleCreateTestArticle = async () => {
    setIsCreating(true);
    setError(null);
    setResult(null);

    try {
      const testArticle = {
        title: "Test News Article: New Immigration Policies for Indians",
        content: `## Breaking News

This is a **test article** to verify our news system is working correctly.

### Key Points:
- Immigration policies have been updated
- New visa processing times announced
- Important changes for Indian applicants

> This is a test quote from an official source

### What This Means:
- Faster processing for certain categories
- New documentation requirements
- Updated fee structures

*This is a test article generated to verify the system functionality.*`,
        summary: "Test article about new immigration policies affecting Indians abroad. This verifies our news system is working correctly.",
        category: "immigration",
        tags: ["immigration", "visa", "policy", "test"],
        metadata: {
          keyTakeaways: [
            "Immigration policies have been updated for Indian applicants",
            "New visa processing times have been announced",
            "Important documentation changes are in effect"
          ],
          sources: [
            {
              source: "Test Immigration Authority",
              url: "https://example.com/test-source", 
              quote: "This is a test source citation"
            }
          ],
          generatedBy: "Manual Test",
          generatedAt: new Date().toISOString()
        },
        status: "published",
        publishedAt: Date.now(),
        generatedAt: Date.now(),
        isActive: true,
        readingTime: 3,
        rawOutput: "Test raw output"
      };

      const articleId = await createArticle(testArticle);
      setResult(articleId);
      console.log("✅ Test article created successfully:", articleId);
      
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
      console.error("❌ Error creating test article:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleGenerateAIArticle = async () => {
    setIsGenerating(true);
    setError(null);
    setAiResult(null);

    try {
      const result = await generateNews({ 
        title: "Breaking: New Immigration Policy Changes for Indian Professionals",
        category: "immigration" 
      });
      setAiResult(result);
      console.log("✅ AI article generated successfully:", result);
      
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
      console.error("❌ Error generating AI article:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🧪 News System Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This page tests the news system by creating a sample article.
            </p>
            
            <div className="space-y-2">
              <Button 
                onClick={handleCreateTestArticle}
                disabled={isCreating || isGenerating}
                className="w-full"
              >
                {isCreating ? "Creating Test Article..." : "Create Test Article"}
              </Button>
              
              <Button 
                onClick={handleGenerateAIArticle}
                disabled={isCreating || isGenerating}
                className="w-full"
                variant="outline"
              >
                {isGenerating ? "Generating AI Article..." : "🤖 Generate AI Article (Custom Title)"}
              </Button>
            </div>

            {result && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">✅ Manual Article Created!</h3>
                <p className="text-green-700">Article created with ID: {result}</p>
                <div className="mt-2 space-x-2">
                  <Button size="sm" asChild>
                    <a href={`/news/${result}`} target="_blank" rel="noopener noreferrer">
                      View Article
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/news" target="_blank" rel="noopener noreferrer">
                      View News List
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {aiResult && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800">🤖 AI Article Generated!</h3>
                <p className="text-blue-700">
                  <strong>Title:</strong> {aiResult.title}<br/>
                  <strong>Category:</strong> {aiResult.category}<br/>
                  <strong>ID:</strong> {aiResult.articleId}
                </p>
                <div className="mt-2 space-x-2">
                  <Button size="sm" asChild>
                    <a href={`/news/${aiResult.articleId}`} target="_blank" rel="noopener noreferrer">
                      View AI Article
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/news" target="_blank" rel="noopener noreferrer">
                      View News List
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800">❌ Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Test Links:</h4>
              <div className="space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <a href="/news" target="_blank" rel="noopener noreferrer">
                    News Page
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/admin" target="_blank" rel="noopener noreferrer">
                    Admin Panel
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}