import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function searchRelevantDocuments(query: string): Promise<string[]> {
 
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
  });

  const [{ embedding }] = embeddingResponse.data;

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,         // 3072-d float array
    match_count: 8,
    match_threshold: 0.25,
  });
  
  if (error) {
    console.error("Supabase search error:", error);
    return [];
  }

  return data.map((item: any) => item.content);
}
