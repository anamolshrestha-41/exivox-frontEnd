import { useState, useEffect } from 'react'
import PostCard from './PostCard'

interface FeedPost {
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

interface Comment {
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

export default function FeedContainer() {
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setPosts([
        {
          id: '1',
          userId: '1',
          user: {
            id: '1',
            username: 'sarah_dev',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            isVerified: true
          },
          content: 'Just built my first React Native app! 🚀 The learning curve was steep but totally worth it. Here\'s what I learned about state management...',
          mediaUrls: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600'],
          type: 'image',
          likes: 234,
          comments: [
            {
              id: 'c1',
              userId: '2',
              user: { id: '2', username: 'mike_codes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
              content: 'Great work! React Native is amazing for cross-platform development.',
              stars: 5,
              isStarred: false,
              isAnonymous: false,
              createdAt: '2024-01-15T11:00:00Z'
            },
            {
              id: 'c2',
              userId: '3',
              user: { id: '3', username: 'anonymous', avatar: '' },
              content: 'Could you share more about the state management approach you used?',
              stars: 2,
              isStarred: true,
              isAnonymous: true,
              createdAt: '2024-01-15T11:15:00Z'
            }
          ],
          shares: 12,
          favorites: 89,
          isLiked: false,
          isFavorited: true,
          createdAt: '2024-01-15T10:30:00Z',
          tags: ['ReactNative', 'MobileDev', 'JavaScript']
        },
        {
          id: '2',
          userId: '2',
          user: {
            id: '2',
            username: 'alex_teacher',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            isVerified: false
          },
          content: 'Quick question: What\'s the best way to handle async operations in React? I\'ve been using useEffect but wondering if there are better patterns.',
          mediaUrls: [],
          type: 'text',
          likes: 67,
          comments: [
            {
              id: 'c3',
              userId: '1',
              user: { id: '1', username: 'sarah_dev', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
              content: 'Try React Query! It handles caching, background updates, and error states beautifully.',
              stars: 12,
              isStarred: true,
              isAnonymous: false,
              createdAt: '2024-01-15T12:00:00Z'
            }
          ],
          shares: 8,
          favorites: 23,
          isLiked: true,
          isFavorited: false,
          createdAt: '2024-01-15T09:45:00Z',
          tags: ['React', 'Async', 'JavaScript']
        },
        {
          id: '3',
          userId: '3',
          user: {
            id: '3',
            username: 'code_ninja',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            isVerified: true
          },
          content: 'Here\'s a quick tutorial on CSS Grid! Perfect for responsive layouts 📱💻',
          mediaUrls: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
          type: 'video',
          likes: 156,
          comments: [],
          shares: 34,
          favorites: 78,
          isLiked: false,
          isFavorited: false,
          createdAt: '2024-01-15T08:20:00Z',
          tags: ['CSS', 'Grid', 'WebDev']
        },
        {
          id: '4',
          userId: '4',
          user: {
            id: '4',
            username: 'ui_designer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            isVerified: false
          },
          content: 'Design system components I created this week! Consistency is key 🎨',
          mediaUrls: [
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
            'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600',
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600'
          ],
          type: 'image',
          likes: 89,
          comments: [
            {
              id: 'c4',
              userId: '5',
              user: { id: '5', username: 'frontend_dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
              content: 'Love the color palette! What tool did you use for this?',
              stars: 3,
              isStarred: false,
              isAnonymous: false,
              createdAt: '2024-01-15T13:30:00Z'
            }
          ],
          shares: 15,
          favorites: 45,
          isLiked: true,
          isFavorited: true,
          createdAt: '2024-01-15T07:15:00Z',
          tags: ['Design', 'UI', 'DesignSystem']
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-0 sm:space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}