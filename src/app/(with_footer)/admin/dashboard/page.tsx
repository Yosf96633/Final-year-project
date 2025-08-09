'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react'

const EmbeddingGeneratorPage = () => {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<String | null>(null) // 'success', 'error', null
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!text.trim()) {
      setStatus('error')
      setMessage('Please enter some text to generate embeddings.')
      return
    }

    setIsLoading(true)
    setStatus(null)
    setMessage('')

    try {
      const response = await fetch('/api/generate-embedding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Embedding generated and stored successfully!')
        setText('') // Clear the textarea
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to generate embedding')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Text Embedding Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Generate embeddings using OpenAI's text-embedding-3-large model
          </p>
        </div>

        {/* Main Card */}
        <div className="  border border-gray-200  rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Textarea */}
            <div className="space-y-2">
              <label htmlFor="text-input" className="block text-sm font-medium">
                Enter text to generate embeddings
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your text here... (Ctrl+Enter to submit)"
                className="min-h-[200px] resize-none border-gray-300  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {text.length} characters • Ctrl+Enter to submit
              </p>
            </div>

            {/* Status Message */}
            {status && (
              <div className={`flex items-center gap-2 p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !text.trim()}
              className="w-full font-semibold py-6 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating Embedding...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Generate Embedding
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            How it works
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <p>• Text is sent to OpenAI's text-embedding-3-large model</p>
            <p>• High-dimensional vector embedding is generated</p>
            <p>• Embedding is stored in Supabase with pgvector extension</p>
            <p>• Perfect for semantic search and similarity matching</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbeddingGeneratorPage