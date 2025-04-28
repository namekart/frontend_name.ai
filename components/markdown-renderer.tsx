"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className="px-4 py-3">
      <ReactMarkdown
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none break-words",
          className
        )}
        components={{
          h1: ({ className, ...props }) => (
            <h1
              className={cn("text-2xl font-bold mt-6 mb-4", className)}
              {...props}
            />
          ),
          h2: ({ className, ...props }) => (
            <h2
              className={cn("text-xl font-bold mt-6 mb-3", className)}
              {...props}
            />
          ),
          h3: ({ className, ...props }) => (
            <h3
              className={cn("text-lg font-bold mt-4 mb-2", className)}
              {...props}
            />
          ),
          p: ({ className, ...props }) => (
            <p className={cn("my-3 leading-normal", className)} {...props} />
          ),
          ul: ({ className, ...props }) => (
            <ul
              className={cn("list-disc list-outside my-4 pl-5", className)}
              {...props}
            />
          ),
          ol: ({ className, ...props }) => (
            <ol
              className={cn("list-decimal list-outside my-4 pl-5", className)}
              {...props}
            />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("mb-1", className)} {...props} />
          ),
          a: ({ className, ...props }) => (
            <a
              className={cn(
                "text-primary underline hover:text-primary/80",
                className
              )}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ className, ...props }) => (
            <code
              className={cn(
                "bg-muted/80 px-1 py-0.5 rounded text-sm",
                className
              )}
              {...props}
            />
          ),
          pre: ({ className, ...props }) => (
            <pre
              className={cn(
                "bg-muted/80 p-4 rounded-md overflow-x-auto my-4",
                className
              )}
              {...props}
            />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              className={cn(
                "border-l-4 border-muted pl-4 italic my-4",
                className
              )}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
