"use client"
import type React from "react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import ReactMarkdown from "react-markdown"
import { useRef, useEffect, useState } from "react"

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Check if user has scrolled up
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100
      setShowScrollButton(isScrolledUp)
    }
  }

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto scroll to bottom when new messages arrive (only if user was already at bottom)
  useEffect(() => {
    if (!showScrollButton || isLoading) {
      scrollToBottom()
    }
  }, [messages, isLoading, showScrollButton])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        void append({ content: input, role: "user" })
        setInput("")
      }
    }
  }

  const header = (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="text-2xl font-semibold leading-none tracking-tight mb-4">
        Ask Anything About Sahara Medical College
      </h1>
      <p className="text-muted-foreground text-sm mb-2">
        This AI assistant is built using <span className="text-foreground">Next.js</span>,{" "}
        <span className="text-foreground">Vercel AI SDK</span>, and{" "}
        <span className="text-foreground">Supabase Vector DB</span>.
      </p>
      <p className="text-muted-foreground text-sm">
        Ask questions about programs, schedules, timetables, and more — I'll fetch answers from verified context.
      </p>
    </div>
  )

  // ChatGPT-style loading animation component
  const LoadingDots = () => (
    <div className="flex space-x-1 py-4">
      <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  )

  return (
    <div className={cn("flex flex-col h-full relative", className)} {...props}>
      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className=" flex items-center h-32">{header}</div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex w-full", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900",
                    )}
                  >
                    <ReactMarkdown>
                      {Array.isArray(message.content) ? message.content.join("\n") : message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Loading State - ChatGPT Style */}
              {isLoading && (
                <div className="flex w-full justify-start">
                  <LoadingDots />
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-20 right-6 z-10">
          <Button
            onClick={scrollToBottom}
            size="sm"
            className="h-10 w-10 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            variant="outline"
          >
            <ChevronDown size={18} />
          </Button>
        </div>
      )}

      {/* Sticky Input Area */}
      <div className="border-t relative bottom-0 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end border border-gray-300 rounded-2xl hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
              <AutoResizeTextarea
                value={input}
                onChange={(value) => setInput(value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about Sahara Medical College.."
                className="flex-1 resize-none border-0 bg-transparent px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0 min-h-[44px] max-h-[200px]"
              />
              <div className="flex items-end p-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!input.trim() || isLoading}
                        className={cn(
                          "h-8 w-8 rounded-full p-0 transition-colors",
                          input.trim() && !isLoading
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed",
                        )}
                      >
                        <ArrowUpIcon size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Send message</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}