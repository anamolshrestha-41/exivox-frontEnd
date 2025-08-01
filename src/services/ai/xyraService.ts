import { apiClient } from '../api/client'

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIResponse {
  message: string
  suggestions?: string[]
  resources?: Array<{
    title: string
    url: string
    type: 'article' | 'video' | 'documentation'
  }>
}

class XyraService {
  async sendMessage(message: string, context?: any): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/chat', {
        message,
        context,
        provider: 'xyra'
      })
      
      return response.data
    } catch (error) {
      console.error('Xyra AI service error:', error)
      throw new Error('Failed to get AI response')
    }
  }

  async getCodeHelp(code: string, language: string, question: string): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/code-help', {
        code,
        language,
        question,
        provider: 'xyra'
      })
      
      return response.data
    } catch (error) {
      console.error('Xyra code help error:', error)
      throw new Error('Failed to get code help')
    }
  }

  async getLearningPath(topic: string, level: 'beginner' | 'intermediate' | 'advanced'): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/learning-path', {
        topic,
        level,
        provider: 'xyra'
      })
      
      return response.data
    } catch (error) {
      console.error('Xyra learning path error:', error)
      throw new Error('Failed to get learning path')
    }
  }
}

export const xyraService = new XyraService()