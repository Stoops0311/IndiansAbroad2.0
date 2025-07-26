"use client";

import React, { useState } from "react";

interface NewsContentProps {
  content: string;
  sources?: Array<{
    source: string;
    url: string;
  }>;
}

export default function NewsContent({ content, sources = [] }: NewsContentProps) {
  const [showCitationTooltip, setShowCitationTooltip] = useState<number | null>(null);

  // Enhanced markdown parser with table and citation support
  const parseMarkdown = (text: string) => {
    let html = text;

    // 1. Parse and convert tables
    html = parseTable(html);

    // 2. Parse inline citations [1], [2], [1][2], etc.
    html = parseCitations(html);

    // 3. Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>');

    // 4. Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // 5. Convert italic text  
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // 6. Convert links (but preserve citation links)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      // Skip if this looks like a citation
      if (/^\d+$/.test(text)) return match;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${text}</a>`;
    });

    // 7. Convert blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>');

    // 8. Convert bullet points
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>');

    // 9. Wrap consecutive list items in ul tags
    html = html.replace(/(<li class="ml-4">.*?<\/li>(?:\s*<li class="ml-4">.*?<\/li>)*)/g, (match) => {
      return `<ul class="list-disc list-inside space-y-2 my-4">${match}</ul>`;
    });

    // 10. Convert line breaks to paragraphs
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

  // Parse inline citations like [1], [2], [1][2]
  const parseCitations = (text: string) => {
    // Match patterns like [1], [2], [1][2], etc.
    const citationRegex = /(\[\d+\])+/g;
    
    return text.replace(citationRegex, (match) => {
      // Extract individual citation numbers
      const citations = match.match(/\[(\d+)\]/g);
      if (!citations) return match;

      const citationElements = citations.map(citation => {
        const num = citation.replace(/[\[\]]/g, '');
        const citationIndex = parseInt(num) - 1;
        const source = sources[citationIndex];
        
        const citationHtml = `
          <span 
            class="citation-link inline-flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/80 mx-0.5 relative"
            data-citation="${num}"
            onclick="window.openCitation('${source?.url || '#'}', '${source?.source || `Source ${num}`}')"
            onmouseenter="if(this.nextElementSibling) this.nextElementSibling.style.display='block'"
            onmouseleave="if(this.nextElementSibling) this.nextElementSibling.style.display='none'"
          >
            ${num}
            <div class="citation-tooltip absolute z-10 p-2 bg-black text-white text-sm rounded shadow-lg max-w-xs hidden pointer-events-none">
              ${source?.source || `Source ${num}`}
              ${source?.url ? `<br><span class="text-gray-300 text-xs">${source.url}</span>` : ''}
            </div>
          </span>
        `;
        
        return citationHtml;
      });

      return citationElements.join('');
    });
  };

  const htmlContent = parseMarkdown(content);

  // Add global function for citation clicks
  React.useEffect(() => {
    (window as any).openCitation = (url: string, title: string) => {
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        alert(`Citation: ${title}`);
      }
    };

    return () => {
      delete (window as any).openCitation;
    };
  }, []);

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
        .news-content h3 {
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

        .citation-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: super;
          font-size: 0.7rem;
          transition: all 0.2s ease;
        }

        .citation-link:hover {
          transform: scale(1.1);
        }

        .citation-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 5px;
          z-index: 1000;
        }

        .citation-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: black;
        }
      `}</style>
    </div>
  );
}