import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant" | "status";
};

type UseChatStreamProps = {
  initialQuery?: string | null;
  chatId?: string;
};

export function useChatStream({
  initialQuery,
  chatId,
}: UseChatStreamProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const statusMessageRef = useRef<string | null>(null);
  const initializedRef = useRef(false);

  // Initialize with welcome message and initial query if provided
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Add initial welcome message
    setMessages([
      {
        id: uuidv4(),
        content:
          "Hello! I'm your domain name assistant. Tell me about your business or project, and I'll suggest some domain names for you.",
        role: "assistant",
      },
    ]);

    // Process initial query if provided
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, []);

  const addMessage = useCallback((content: string, role: Message["role"]) => {
    const id = uuidv4();

    if (role === "status") {
      // If there's an existing status message, remove it first
      if (statusMessageRef.current) {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== statusMessageRef.current)
        );
      }
      statusMessageRef.current = id;
    }

    setMessages((prev) => [...prev, { id, content, role }]);
    return id;
  }, []);

  const updateStatusMessage = useCallback((content: string) => {
    if (statusMessageRef.current) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === statusMessageRef.current ? { ...msg, content } : msg
        )
      );
    }
  }, []);

  const removeStatusMessage = useCallback(() => {
    if (statusMessageRef.current) {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== statusMessageRef.current)
      );
      statusMessageRef.current = null;
    }
  }, []);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isProcessing) return;

      // Add user message
      addMessage(message, "user");

      // Clear input and set processing state
      setInput("");
      setIsProcessing(true);

      try {
        // Connect directly to the backend SSE endpoint
        const response = await fetch("http://localhost:8000/api/chat-stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: message,
            debug: false,
            chatId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Handle the SSE stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Failed to get reader from response");

        const decoder = new TextDecoder();
        let assistantResponse = "";
        let assistantMessageId: string | null = null;
        let firstChunkReceived = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // Stream is complete, remove status message
            removeStatusMessage();
            break;
          }

          // Decode the chunk and process it
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.substring(6);
              if (data !== "[DONE]") {
                // Add assistant message on first data received
                if (!firstChunkReceived) {
                  firstChunkReceived = true;
                  assistantMessageId = addMessage("", "assistant");
                }

                assistantResponse += data;

                // Update the assistant message content in real-time
                if (assistantMessageId) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: assistantResponse }
                        : msg
                    )
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Update status message to show error
        updateStatusMessage("Connection error. Please try again.");
        // After a few seconds, remove the status message
        setTimeout(() => {
          removeStatusMessage();
        }, 3000);
      } finally {
        // Reset processing state
        setIsProcessing(false);
      }
    },
    [isProcessing, addMessage, removeStatusMessage, updateStatusMessage, chatId]
  );

  return {
    messages,
    input,
    setInput,
    isProcessing,
    sendMessage: handleSendMessage,
  };
}
