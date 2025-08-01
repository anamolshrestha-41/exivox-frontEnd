export interface Comment {
  id: string
  userId: string
  user: {
    id: string
    username: string
    avatar?: string
  }
  content: string
  stars: number
  isStarred: boolean
  isAnonymous: boolean
  createdAt: string
  replies?: Comment[]
}

export interface FeedPost {
  id: string
  userId: string
  user: {
    id: string
    username: string
    avatar?: string
    isVerified: boolean
  }
  content: string
  mediaUrls: string[]
  type: 'image' | 'video' | 'reel' | 'text'
  likes: number
  comments: Comment[]
  shares: number
  favorites: number
  isLiked: boolean
  isFavorited: boolean
  createdAt: string
  tags?: string[]
}