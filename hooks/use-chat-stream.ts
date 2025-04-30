import { useState, useEffect, useRef } from 'react'
import { chat, getMessages } from '@/services/name-ai/methods'

type UIMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: UIMessage = {
  id: 'initial',
  role: 'assistant',
  content: "Hello! I'm your domain name assistant. Tell me about your business or project, and I'll suggest some domain names for you."
}

export function useChatStream({ initialQuery, chatId }: { initialQuery: string | null; chatId: string }) {
  const [messages, setMessages] = useState<UIMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    const fetchMessages = async () => {
      if (hasFetchedRef.current) return
      hasFetchedRef.current = true

      try {
        const response = await getMessages(chatId)
        const formattedMessages = response.messages.map(msg => ({
          id: msg.message_id,
          role: msg.sender as 'user' | 'assistant',
          content: msg.content
        }))

        if (formattedMessages.length === 0 && initialQuery) {
          // If no messages and we have an initial query, send it
          const userMessage: UIMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: initialQuery
          }
          setMessages(prev => [...prev, userMessage])
          setIsProcessing(true)

          try {
            const response = await chat({
              query: initialQuery,
              chat_session_id: chatId
            })

            const assistantMessage: UIMessage = {
              id: Date.now().toString(),
              role: 'assistant',
              content: response.content
            }

            setMessages(prev => [...prev, assistantMessage])
          } catch (error) {
            console.error('Failed to send initial query:', error)
            setMessages(prev => [
              ...prev,
              {
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
              }
            ])
          } finally {
            setIsProcessing(false)
          }
        }else{
          setMessages([INITIAL_MESSAGE, ...formattedMessages])
        }


      } catch (error) {
        console.error('Failed to fetch messages:', error)
        // Keep the initial message and allow user to continue
        if (initialQuery) {
          const userMessage: UIMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: initialQuery
          }
          setMessages(prev => [...prev, userMessage])
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [chatId, initialQuery])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isProcessing || isLoading) return

    const userMessage: UIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    try {
      const response = await chat({
        query: content,
        chat_session_id: chatId
      })

      const assistantMessage: UIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.content
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    messages,
    input,
    setInput,
    isProcessing,
    isLoading,
    sendMessage
  }
}
