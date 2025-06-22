import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot | Resolve Campus Query",
  description: "A simple chatbot built using the AI SDK and gpt-4o-mini.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={cn(
          "h-full w-full flex flex-col antialiased bg-black text-white",
          inter.className
        )}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
