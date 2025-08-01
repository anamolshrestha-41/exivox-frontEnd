export const APP_NAME = 'Exivox'

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  CHAT: '/chat',
  GROUPS: '/groups',
  QA: '/qa',
  EXPLORE: '/explore',
  LOGIN: '/login',
} as const

export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  REEL: 'reel',
} as const

export const CHAT_TYPES = {
  DIRECT: 'direct',
  GROUP: 'group',
} as const

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
} as const

export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
} as const