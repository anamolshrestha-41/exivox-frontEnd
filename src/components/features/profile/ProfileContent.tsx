import { useState, useEffect } from 'react'
import { Grid, Play, Image, FileText, HelpCircle, Edit3, Trash2, MoreHorizontal, Heart, MessageCircle, Share, Bookmark } from 'lucide-react'

type ContentType = 'all' | 'videos' | 'images' | 'reels' | 'questions'
type ViewMode = 'owner' | 'visitor'

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
  comments: any[]
  shares: number
  favorites: number
  isLiked: boolean
  isFavorited: boolean
  createdAt: string
  tags?: string[]
}

interface ProfileContentProps {
  userId: string
  activeTab: ContentType
  onTabChange: (tab: ContentType) => void
  viewMode: ViewMode
}

const tabs = [
  { id: 'all' as ContentType, label: 'All', icon: Grid },
  { id: 'videos' as ContentType, label: 'Videos', icon: Play },
  { id: 'images' as ContentType, label: 'Images', icon: Image },
  { id: 'reels' as ContentType, label: 'Reels', icon: Play },
  { id: 'questions' as ContentType, label: 'Q&A', icon: HelpCircle },
]

export default function ProfileContent({ userId, activeTab, onTabChange, viewMode }: ProfileContentProps) {
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      const mockPosts: FeedPost[] = [
        {
          id: '1',
          userId: userId,
          user: {
            id: userId,
            username: 'sarah_dev',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            isVerified: true
          },
          content: 'Building a React component library from scratch! Here\'s what I learned about design systems and reusable components.',
          mediaUrls: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600'],
          type: 'image',
          likes: 234,
          comments: [],
          shares: 12,
          favorites: 89,
          isLiked: false,
          isFavorited: true,
          createdAt: '2024-01-15T10:30:00Z',
          tags: ['React', 'ComponentLibrary', 'DesignSystem']
        },
        {
          id: '2',
          userId: userId,
          user: {
            id: userId,
            username: 'sarah_dev',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            isVerified: true
          },
          content: 'Quick tutorial on CSS Grid layouts! Perfect for responsive design.',
          mediaUrls: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
          type: 'video',
          likes: 156,
          comments: [],
          shares: 34,
          favorites: 78,
          isLiked: false,
          isFavorited: false,
          createdAt: '2024-01-14T08:20:00Z',
          tags: ['CSS', 'Grid', 'Tutorial']
        },
        {
          id: '3',
          userId: userId,
          user: {
            id: userId,
            username: 'sarah_dev',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            isVerified: true
          },
          content: 'What\'s the best way to handle state management in large React applications? Looking for recommendations!',
          mediaUrls: [],
          type: 'text',
          likes: 89,
          comments: [],
          shares: 15,
          favorites: 45,
          isLiked: true,
          isFavorited: false,
          createdAt: '2024-01-13T15:45:00Z',
          tags: ['React', 'StateManagement', 'Question']
        }
      ]
      
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [userId, activeTab])

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true
    if (activeTab === 'videos') return post.type === 'video'
    if (activeTab === 'images') return post.type === 'image'
    if (activeTab === 'reels') return post.type === 'reel'
    if (activeTab === 'questions') return post.type === 'text'
    return true
  })

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== postId))
    }
  }

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleFavorite = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isFavorited: !post.isFavorited }
        : post
    ))
  }

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPosts.map((post) => (
        <div key={post.id} className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
          {/* Post Preview */}
          <div className="aspect-square bg-gray-100 relative">
            {post.mediaUrls.length > 0 ? (
              <>
                {post.type === 'video' || post.type === 'reel' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={post.mediaUrls[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={post.mediaUrls[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4">
                <p className="text-gray-700 text-sm line-clamp-6 text-center">
                  {post.content}
                </p>
              </div>
            )}
            
            {/* Post type indicator */}
            <div className="absolute top-2 left-2">
              {post.type === 'video' && <Play className="w-5 h-5 text-white drop-shadow-lg" />}
              {post.type === 'reel' && <Play className="w-5 h-5 text-white drop-shadow-lg" />}
              {post.type === 'image' && <Image className="w-5 h-5 text-white drop-shadow-lg" />}
              {post.type === 'text' && <FileText className="w-5 h-5 text-white drop-shadow-lg" />}
            </div>

            {/* Owner actions */}
            {viewMode === 'owner' && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Visitor actions */}
            {viewMode === 'visitor' && (
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 ${
                      post.isLiked ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleFavorite(post.id)}
                    className={`p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 ${
                      post.isFavorited ? 'text-yellow-500' : 'text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
              <div key={tab.id} className="h-10 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* View toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewStyle('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewStyle === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">
              {viewMode === 'owner' 
                ? 'Start sharing your knowledge and experiences!'
                : 'This user hasn\'t shared any content yet.'
              }
            </p>
          </div>
        ) : (
          <GridView />
        )}
      </div>
    </div>
  )
}