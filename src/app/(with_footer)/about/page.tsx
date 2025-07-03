"use client"
import { useTheme } from "next-themes"
const page = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black 
  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
  dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] 
  bg-[size:4rem_4rem] 
  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      ></div>

      <main className="px-6 py-16 relative z-0 space-y-24">
        {/* Hero Section with Mission */}
        <section className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Mission */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">Our Mission</h1>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We believe that conversations should be intelligent, contextual, and deeply meaningful. Our AI-powered
                  chat application harnesses the power of vector embeddings to understand not just what you say, but the
                  intent and context behind every message.
                </p>
                <p>
                  By combining cutting-edge natural language processing with semantic search capabilities, we're
                  building the future of human-AI interaction—one that feels natural, intuitive, and genuinely helpful
                  in solving real-world problems.
                </p>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary to-primary/70">
                <img
                  src="/mission.png"
                  alt="AI Chat Application Interface"
                  className="w-full h-full object-cover"
                />
           
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="max-w-4xl mx-auto text-center space-y-16">
          {/* The Problem */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">The <span className=" text-destructive">Problem</span> Students Face</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Traditional chatbots and AI assistants often miss the nuance of human communication. They struggle with
              context, forget previous conversations, and provide generic responses that don't truly understand what
              users are trying to accomplish.
            </p>
          </div>

          {/* Enhanced Curved Arrow */}
         
             <div className=" flex justify-center">
              <img className=" h-52 max-md:h-28" src={`${theme==='dark' ? '/Arrow_white.png' : '/Arrow_black.png'}`} alt="" />
             </div>
          {/* Our Solution */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">The <span className=" text-green-400">Solution</span> We Provide</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We've built an intelligent chat system that uses vector embeddings to understand the semantic meaning of
              conversations. Our AI remembers context, learns from interactions, and provides personalized responses
              that truly understand your needs and goals.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Powered by Advanced AI</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our technology stack combines the latest in AI research with production-ready infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Vector Embeddings</h3>
              <p className="text-muted-foreground">
                Transform conversations into high-dimensional vectors that capture semantic meaning and context
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-xl font-semibold mb-3 text-foreground">RAG Architecture</h3>
              <p className="text-muted-foreground">
                Retrieval-Augmented Generation ensures responses are both accurate and contextually relevant
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page
