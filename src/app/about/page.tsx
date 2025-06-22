"use client";
import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
const page = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  

  return (
    <div>
      <header
        className={`sticky top-0 z-50 px-6 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              C
            </div>
            <span>Cambot</span>
          </div>
          <nav className="flex gap-8">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Chat
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black 
  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
  dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] 
  bg-[size:4rem_4rem] 
  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      ></div>

     <div className="relative z-10 max-w-7xl mx-auto md:py-24 py-12 space-y-16">
  {/* Our Mission */}
  <div className="space-y-3">
    <h1 className="text-center md:text-6xl text-4xl font-semibold">
      Our Mission
    </h1>
    <p className="text-center md:text-xl text-base font-light">
      To revolutionize campus communication by providing instant, AI-powered
      assistance that empowers students, reduces administrative workload,
      and creates a seamless information access experience for everyone on
      campus — anytime, anywhere.
    </p>
  </div>

  {/* The Problem */}
  <div className="space-y-3">
    <h1 className="text-center md:text-6xl text-4xl font-semibold">
      The Problem
    </h1>
    <p className="text-center md:text-xl text-base font-light px-2">
      Students often struggle to find accurate and timely information related to admissions, exam schedules, hostel facilities, or campus services.  
      Administrative staff waste countless hours answering repetitive questions, leading to inefficiency and frustration on both sides.
    </p>
  </div>

 <div className="flex justify-center my-8">
  <Image 
     src={theme === 'dark' ? '/arrow-white.png' : '/arrow-black.png'}
    alt="Arrow connecting problem and solution" 
    width={200} 
    height={100} 
    className="h-auto w-auto max-w-full"
  />
</div>


  {/* Solution Section Placeholder */}
  <div id="solution" className="space-y-3">
    <h1 className="text-center md:text-6xl text-4xl font-semibold">
      The Solution
    </h1>
    <p className="text-center md:text-xl text-base font-light px-2">
      Our AI-powered chatbot instantly resolves campus queries using advanced natural language understanding and real-time data integration — providing quick, accurate, 24/7 assistance to both students and staff.
    </p>
  </div>
</div>

    </div>
  );
};

export default page;
