export interface GroupMember {
  id: string
  username: string
  displayName: string
  avatar?: string
  role: 'admin' | 'moderator' | 'member'
  joinedAt: string
  isOnline: boolean
  lastSeen?: string
}

export interface GroupMessage {
  id: string
  groupId: string
  userId: string
  user: GroupMember
  content: string
  type: 'text' | 'video' | 'poll' | 'system'
  timestamp: string
  reactions: MessageReaction[]
  replyTo?: string
  isEdited: boolean
}

export interface MessageReaction {
  emoji: string
  users: string[]
  count: number
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  type: 'single' | 'multiple'
  createdBy: string
  createdAt: string
  expiresAt?: string
  isAnonymous: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: string[]
  count: number
}

export interface GroupVideo {
  id: string
  title: string
  url: string
  thumbnail?: string
  duration: number
  uploadedBy: string
  uploadedAt: string
  views: number
  likes: number
}

export interface Group {
  id: string
  name: string
  description: string
  avatar?: string
  coverImage?: string
  memberCount: number
  isPrivate: boolean
  adminIds: string[]
  moderatorIds: string[]
  createdAt: string
  lastActivity: string
  category: string
  tags: string[]
}

export interface TypingIndicator {
  userId: string
  username: string
  timestamp: string
}