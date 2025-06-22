import { type CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { searchRelevantDocuments } from '@/utils/searchRelevantDocuments';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const userQuestion = messages[messages.length - 1]?.content;

  const contextChunks = await searchRelevantDocuments(userQuestion);

  const systemPrompt = `
You are an AI assistant. Use the following retrieved context to answer the user's query as accurately as possible.

Context:
${contextChunks.length > 0 ? contextChunks.join('\n\n') : 'No relevant context found.'}

Instructions:
- Kindly when generate response . Beautifully format the Response
- If the provided context does not contain enough relevant information to answer the user's question, simply reply: "I'm sorry, I'm only assist for Sahara Medical College Narowal."
- Do not hallucinate or fabricate information that is not present in the context.
- If the context includes any timetable or schedule data, format your answer as a well-structured markdown table.
- Always be concise, clear, and helpful.
`;

  // 🎯 3️⃣ Use Vercel AI SDK for streaming call
  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  });

  // 🔄 4️⃣ Return streaming response
  return result.toDataStreamResponse();
}
