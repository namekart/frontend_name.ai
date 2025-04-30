"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useChatStream } from "@/hooks/use-chat-stream";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, Loader2, Bot, User } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ChatMessageShimmer, UserMessageShimmer } from "@/components/ui/shimmer";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const chatId = params.id as string;
  const initialQuery = searchParams.get("query");
  
  const { messages, input, setInput, isProcessing, isLoading, sendMessage } =
    useChatStream({
      initialQuery,
      chatId,
    })

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing || isLoading) return;
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Format message content for display
  const formatMessageContent = (content: string, role: string) => {
    if (!content) return null;

    // If it's an assistant message, use the markdown renderer
    if (role === "assistant") {
      return <MarkdownRenderer content={content} />;
    }

    // For user messages, just use plain text
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-3xl">
      {/* Header */}
      {/* <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Domain Name Assistant</h1>
            <p className="text-xs text-muted-foreground">Chat ID: {chatId}</p>
          </div>
        </div>
      </header> */}

      {/* Chat Container */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              <ChatMessageShimmer />
              <UserMessageShimmer />
              <ChatMessageShimmer />
              <UserMessageShimmer />
            </div>
          ) : (
            <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`animate-fade-in group flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}

                <div
                  className={`max-w-[80%] rounded-lg overflow-hidden ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div
                    className={`${
                      message.role === "assistant" ? "px-0 py-0" : "px-4 py-3"
                    }`}
                  >
                    {formatMessageContent(message.content, message.role)}
                  </div>
                </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="animate-fade-in group flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm w-fit text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                <Loader2 className="h-4 w-4 inline mr-2 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t bg-background p-4 sticky bottom-0 ">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "Loading chat..." : "Type a message..."}
              className="min-h-[60px] max-h-[200px] p-4 resize-none pr-12 rounded-xl border-muted focus-visible:ring-1"
              disabled={isProcessing || isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 bottom-3 h-8 w-8 rounded-full"
              disabled={isProcessing || isLoading || !input.trim()}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          {isProcessing && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Processing your request...
            </p>
          )}
        </form>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
        }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
