"use client";
import type React from "react";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import ReactMarkdown from "react-markdown";
export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const { messages, input, setInput, append } = useChat({
    api: "/api/chat",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      void append({ content: input, role: "user" });
      setInput("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        void append({ content: input, role: "user" });
        setInput("");
      }
    }
  };
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
      Ask questions about programs, schedules, timetables, and more — I’ll fetch answers from verified context.
    </p>
  </div>
);

  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
           <div className=" flex items-center h-32">
             {header}
           </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <ReactMarkdown>
                      {Array.isArray(message.content)
                        ? message.content.join("\n")
                        : message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
                        disabled={!input.trim()}
                        className={cn(
                          "h-8 w-8 rounded-full p-0 transition-colors",
                          input.trim()
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
  );
}
