import { useState } from 'react'
import { Heart, MessageCircle, Share, Bookmark, Play, CheckCircle, MoreHorizontal } from 'lucide-react'
import CommentSection from './CommentSection'
import SecureBadge from '../security/SecureBadge'

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

interface PostCardProps {
  post: FeedPost
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isFavorited, setIsFavorited] = useState(post.isFavorited)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  const renderMedia = () => {
    if (post.mediaUrls.length === 0) return null

    return (
      <div className="mt-3 rounded-lg overflow-hidden">
        {post.type === 'video' || post.type === 'reel' ? (
          <div className="relative bg-black aspect-video">
            <video 
              className="w-full h-full object-cover" 
              poster={post.mediaUrls[0]}
              controls={post.type === 'video'}
            >
              <source src={post.mediaUrls[0]} type="video/mp4" />
            </video>
            {post.type === 'reel' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80" />
              </div>
            )}
          </div>
        ) : (
          <div className={`grid gap-1 ${
            post.mediaUrls.length === 1 ? 'grid-cols-1' : 
            post.mediaUrls.length === 2 ? 'grid-cols-2' : 
            'grid-cols-2'
          }`}>
            {post.mediaUrls.slice(0, 4).map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt=""
                  className="w-full h-64 object-cover"
                />
                {index === 3 && post.mediaUrls.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">+{post.mediaUrls.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-gray-200 sm:rounded-lg sm:border sm:shadow-sm sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar || '/default-avatar.png'}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900 text-sm">{post.user.username}</h3>
              {post.user.isVerified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-500">
                {formatTimeAgo(post.createdAt)}
              </p>
              <SecureBadge size="sm" />
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4">
        {post.content && (
          <p className="text-gray-900 mb-3 text-sm leading-relaxed">{post.content}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {renderMedia()}
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-green-500 transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className={`transition-colors ${
              isFavorited ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes and comments count */}
        <div className="mt-2 space-y-1">
          {likesCount > 0 && (
            <p className="text-sm font-semibold text-gray-900">
              {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
            </p>
          )}
          {post.comments.length > 0 && (
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection 
          postId={post.id} 
          comments={post.comments}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  )
}