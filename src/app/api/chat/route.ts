import { type CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { searchRelevantDocuments } from '@/utils/searchRelevantDocuments';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const userQuestion = messages[messages.length - 1]?.content;

  const contextChunks = await searchRelevantDocuments(userQuestion);

 const systemPrompt = `
You are an AI assistant. Use the retrieved context below to answer the user's query accurately and helpfully.

Context:
${contextChunks.length > 0 ? contextChunks.join('\n\n') : 'No relevant context found.'}

Instructions:
- Format all responses using proper **Markdown**.
- Use bullet points (• or -) or numbered lists when listing items.
- If the context includes a **timetable**, **class schedule**, or similar structured data:
  - Present it as plain text grouped by day (e.g., "Monday").
  - For each entry, include the **time**, **subject name**, and **instructor**.
  - Example format (avoid using tables):  
    **Day Name**  
    Start–End Time - Subject Name (Instructor Name)  
    (Repeat for each time slot)
- Use **headings** and **line breaks** to clearly separate sections of the response.
- Be concise, clear, and factually accurate.
- If the context does **not contain relevant information**, respond with:  
  **"I'm sorry, I can only assist for Sahara Medical College Narowal."**
- Do **not** hallucinate, assume, or invent facts outside of the given context.
`


  // 🎯 3️⃣ Use Vercel AI SDK for streaming call
  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  });

  // 🔄 4️⃣ Return streaming response
  return result.toDataStreamResponse();
}
