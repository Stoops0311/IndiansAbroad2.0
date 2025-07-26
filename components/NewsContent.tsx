"use client";

import React from "react";

interface NewsContentProps {
  content: string;
  sources?: Array<{
    source: string;
    url: string;
  }>;
}

export default function NewsContent({ content, sources = [] }: NewsContentProps) {

  // Enhanced markdown parser with table support
  const parseMarkdown = (text: string) => {
    let html = text;

    // 1. Parse and convert tables
    html = parseTable(html);

    // 2. Convert headers (process in order from most specific to least)
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold mt-6 mb-3">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>');

    // 3. Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // 4. Convert italic text  
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // 5. Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${text}</a>`;
    });

    // 6. Convert blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>');

    // 7. Convert bullet points
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>');

    // 8. Wrap consecutive list items in ul tags
    html = html.replace(/(<li class="ml-4">.*?<\/li>(?:\s*<li class="ml-4">.*?<\/li>)*)/g, (match) => {
      return `<ul class="list-disc list-inside space-y-2 my-4">${match}</ul>`;
    });

    // 9. Convert line breaks to paragraphs
    const paragraphs = html.split('\n\n').filter(p => p.trim());
    html = paragraphs.map(p => {
      const trimmed = p.trim();
      // Don't wrap headers, lists, blockquotes, or tables in paragraph tags
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || 
          trimmed.startsWith('<blockquote') || trimmed.startsWith('<table') ||
          trimmed.startsWith('<li')) {
        return trimmed;
      }
      return `<p class="mb-4 leading-7">${trimmed}</p>`;
    }).join('\n');

    return html;
  };

  // Parse markdown tables into HTML tables
  const parseTable = (text: string) => {
    const tableRegex = /^\|(.+)\|\s*\n\|[-\s|:]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm;
    
    return text.replace(tableRegex, (match, headerRow, bodyRows) => {
      // Parse header
      const headers = headerRow.split('|')
        .map((h: string) => h.trim())
        .filter((h: string) => h.length > 0);

      // Parse body rows
      const rows = bodyRows.trim().split('\n')
        .map((row: string) => row.split('|')
          .map((cell: string) => cell.trim())
          .filter((cell: string) => cell.length > 0)
        )
        .filter((row: string[]) => row.length > 0);

      // Generate HTML table
      const headerHtml = headers.map((h: string) => `<th class="px-4 py-2 text-left font-semibold border-b border-gray-300">${h}</th>`).join('');
      
      const bodyHtml = rows.map((row: string[]) => {
        const cellsHtml = row.map((cell: string) => `<td class="px-4 py-2 border-b border-gray-200">${cell}</td>`).join('');
        return `<tr class="hover:bg-gray-50">${cellsHtml}</tr>`;
      }).join('');

      return `
        <div class="table-container my-6 overflow-x-auto">
          <table class="min-w-full border-collapse bg-white rounded-lg shadow-sm border border-gray-200">
            <thead class="bg-gray-50">
              <tr>${headerHtml}</tr>
            </thead>
            <tbody>
              ${bodyHtml}
            </tbody>
          </table>
        </div>
      `;
    });
  };


  const htmlContent = parseMarkdown(content);

  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="news-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      <style jsx>{`
        .news-content {
          line-height: 1.7;
        }
        
        .news-content h1,
        .news-content h2,
        .news-content h3,
        .news-content h4 {
          color: hsl(var(--foreground));
        }
        
        .news-content p {
          color: hsl(var(--foreground));
          margin-bottom: 1rem;
        }
        
        .news-content ul {
          margin: 1rem 0;
        }
        
        .news-content li {
          color: hsl(var(--foreground));
          margin-bottom: 0.5rem;
        }
        
        .news-content blockquote {
          background: hsl(var(--muted) / 0.3);
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        
        .news-content a {
          color: hsl(var(--primary));
          text-decoration: none;
        }
        
        .news-content a:hover {
          text-decoration: underline;
        }
        
        .news-content strong {
          color: hsl(var(--foreground));
        }
        
        .news-content em {
          color: hsl(var(--muted-foreground));
        }

        .table-container {
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .table-container table {
          font-size: 0.9rem;
        }

        .table-container th {
          background-color: hsl(var(--muted));
          color: hsl(var(--foreground));
          font-weight: 600;
        }

        .table-container td {
          color: hsl(var(--foreground));
        }

        .table-container tr:hover td {
          background-color: hsl(var(--muted) / 0.3);
        }
      `}</style>
    </div>
  );
}