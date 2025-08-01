import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";
import { CoreMessage } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function searchRelevantDocuments(
  query:  string
): Promise<string[]> {
  // console.log('Query: ', query)
 
const embeddingResponse = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: query, 
});

  const [{ embedding }] = embeddingResponse.data;
  //  console.log('Embeddings: ', embedding)
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_count: 8,
    match_threshold: 0.65,
  });
  //  console.log('Data: ' , data)
  if (error) {
    console.error("Supabase search error:", error);
    return [];
  }
  return data.map((item: any) => item.content);
}
