export interface ProfileUser {
  id: string
  username: string
  displayName: string
  email: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  isVerified: boolean
  createdAt: string
  website?: string
  location?: string
}

export interface ContentFolder {
  id: string
  name: string
  description?: string
  thumbnail?: string
  postCount: number
  isPublic: boolean
  createdAt: string
  posts: string[] // post IDs
}

export interface ProfileStats {
  totalPosts: number
  totalLikes: number
  totalViews: number
  totalComments: number
}

import { FeedPost } from './feed'

export interface ProfileContent {
  videos: FeedPost[]
  images: FeedPost[]
  reels: FeedPost[]
  questions: FeedPost[]
}

export type ContentType = 'all' | 'videos' | 'images' | 'reels' | 'questions'
export type ViewMode = 'owner' | 'visitor'