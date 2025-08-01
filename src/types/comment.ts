export interface CommentUser {
  id: string
  username: string
  displayName: string
  avatar?: string
  isVerified?: boolean
}

export interface Comment {
  id: string
  parentId?: string
  userId: string
  user: CommentUser
  content: string
  isAnonymous: boolean
  stars: number
  isStarred: boolean
  createdAt: string
  updatedAt?: string
  isEdited: boolean
  attachments: CommentAttachment[]
  replies?: Comment[]
  isFlagged: boolean
  moderationStatus: 'approved' | 'pending' | 'rejected' | 'warning'
  moderationReason?: string
}

export interface CommentAttachment {
  id: string
  type: 'image' | 'file'
  url: string
  name: string
  size: number
}

export interface CommentReaction {
  emoji: string
  count: number
  users: string[]
  isReacted: boolean
}

export interface CommentFormData {
  content: string
  isAnonymous: boolean
  attachments: File[]
  parentId?: string
}