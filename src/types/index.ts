export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  isVerified: boolean
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  user: User
  content: string
  mediaUrls: string[]
  type: 'text' | 'image' | 'video' | 'reel'
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  createdAt: string
}

export interface Question {
  id: string
  userId: string
  user: User
  title: string
  content: string
  tags: string[]
  votes: number
  answers: number
  isAnswered: boolean
  createdAt: string
}

export interface Chat {
  id: string
  name?: string
  type: 'direct' | 'group'
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  updatedAt: string
}

export interface Message {
  id: string
  chatId: string
  userId: string
  user: User
  content: string
  type: 'text' | 'image' | 'file'
  createdAt: string
}

export interface Group {
  id: string
  name: string
  description: string
  avatar?: string
  memberCount: number
  isPrivate: boolean
  adminIds: string[]
  createdAt: string
}

export interface Playlist {
  id: string
  userId: string
  name: string
  description?: string
  postIds: string[]
  isPublic: boolean
  createdAt: string
}