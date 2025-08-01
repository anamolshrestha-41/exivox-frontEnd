import { useState } from 'react'
import { Star, Send, UserX } from 'lucide-react'

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

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  onClose: () => void
}

export default function CommentSection({ postId, comments, onClose }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    console.log('New comment:', { postId, content: newComment, isAnonymous })
    setNewComment('')
  }

  const handleStarComment = (commentId: string) => {
    console.log('Star comment:', commentId)
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

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-8 mt-2' : 'mb-4'}`}>
      <img
        src={comment.isAnonymous ? '/anonymous-avatar.png' : comment.user.avatar || '/default-avatar.png'}
        alt={comment.isAnonymous ? 'Anonymous' : comment.user.username}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-2xl px-3 py-2">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-sm text-gray-900">
              {comment.isAnonymous ? (
                <span className="flex items-center space-x-1">
                  <UserX className="w-3 h-3" />
                  <span>Anonymous</span>
                </span>
              ) : (
                comment.user.username
              )}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-800">{comment.content}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-1 ml-3">
          <button 
            onClick={() => handleStarComment(comment.id)}
            className={`flex items-center space-x-1 text-xs transition-colors ${
              comment.isStarred ? 'text-yellow-600' : 'text-gray-500 hover:text-yellow-600'
            }`}
          >
            <Star className={`w-3 h-3 ${comment.isStarred ? 'fill-current' : ''}`} />
            <span>{comment.stars}</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
            Reply
          </button>
        </div>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="max-h-96 overflow-y-auto p-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8">No comments yet. Be the first to comment!</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
      
      {/* Add Comment */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-3">
            <img
              src={isAnonymous ? '/anonymous-avatar.png' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
              alt={isAnonymous ? 'Anonymous' : 'Your avatar'}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={2}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between ml-11">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Comment anonymously</span>
            </label>
            
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}