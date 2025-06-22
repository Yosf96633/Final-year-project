import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function searchRelevantDocuments(query: string): Promise<string[]> {
  // 1️⃣ Generate embedding for the query
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const [{ embedding }] = embeddingResponse.data;

  // 2️⃣ Query Supabase using vector similarity
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.05,
    match_count: 5,
  });

  if (error) {
    console.error('Supabase search error:', error);
    return [];
  }

  // Assuming data contains chunks with a 'content' field
  return data.map((item: any) => item.content);
}
