// app/api/generate-embedding/route.js
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export async function POST(request:NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Generate embedding using OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: text.trim(),
    })

    const embedding = embeddingResponse.data[0].embedding

    // Store in Supabase with pgvector
    const { data, error } = await supabase
      .from('fypembeddings') // Replace with your table name
      .insert({
        content: text.trim(),
        embedding: embedding,
     
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to store embedding in database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Embedding generated and stored successfully',
      data: {
        id: data[0].id,
        text_length: text.length,
        embedding_dimensions: embedding.length,
      },
    })

  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'Failed to generate embedding with OpenAI' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}