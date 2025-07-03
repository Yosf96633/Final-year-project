import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot | Resolve Campus Query",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        " flex flex-col h-svh antialiased",
        inter.className
      )}
    >
      <Header/>
      <TooltipProvider delayDuration={0}>  <div className="flex-1 min-h-0">{children}</div></TooltipProvider>
    </div>
  );
}
