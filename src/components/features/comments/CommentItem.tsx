import { useState } from 'react'
import { Star, Reply, Flag, MoreHorizontal, UserX, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { Comment } from '../../../types/comment'
import CommentForm from './CommentForm'
import ModerationAlert from './ModerationAlert'

interface CommentItemProps {
  comment: Comment
  onStar: (commentId: string) => void
  onReply: (parentId: string, content: string, isAnonymous: boolean) => void
  isReply?: boolean
  depth?: number
}

export default function CommentItem({ 
  comment, 
  onStar, 
  onReply, 
  isReply = false, 
  depth = 0 
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [showModerationDetails, setShowModerationDetails] = useState(false)

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  const handleReplySubmit = (formData: any) => {
    onReply(comment.id, formData.content, formData.isAnonymous)
    setShowReplyForm(false)
  }

  const shouldShowModerationAlert = comment.isFlagged || comment.moderationStatus === 'warning'
  const maxDepth = 3 // Maximum nesting level

  return (
    <div className={`${isReply && depth > 0 ? 'ml-6 sm:ml-8' : ''}`}>
      {/* Moderation Alert */}
      {shouldShowModerationAlert && (
        <ModerationAlert
          comment={comment}
          onToggleDetails={() => setShowModerationDetails(!showModerationDetails)}
          showDetails={showModerationDetails}
        />
      )}

      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.isAnonymous ? (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <UserX className="w-4 h-4 text-gray-600" />
            </div>
          ) : (
            <img
              src={comment.user.avatar || '/default-avatar.png'}
              alt={comment.user.displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Comment Header */}
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm text-gray-900">
              {comment.isAnonymous ? (
                <span className="flex items-center space-x-1">
                  <span>Anonymous</span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    Anonymous
                  </span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <span>{comment.user.displayName}</span>
                  {comment.user.isVerified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </span>
              )}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(comment.createdAt)}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-gray-400">(edited)</span>
            )}
          </div>

          {/* Comment Text */}
          <div className="mb-2">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>

          {/* Attachments */}
          {comment.attachments && comment.attachments.length > 0 && (
            <div className="mb-2 space-y-2">
              {comment.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
                  {attachment.type === 'image' ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs text-blue-600 font-medium">
                        {attachment.name.split('.').pop()?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(attachment.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Actions */}
          <div className="flex items-center space-x-4 text-xs">
            {/* Star Button */}
            <button
              onClick={() => onStar(comment.id)}
              className={`flex items-center space-x-1 transition-colors ${
                comment.isStarred 
                  ? 'text-yellow-600' 
                  : 'text-gray-500 hover:text-yellow-600'
              }`}
            >
              <Star className={`w-3 h-3 ${comment.isStarred ? 'fill-current' : ''}`} />
              <span>{comment.stars}</span>
            </button>

            {/* Reply Button */}
            {depth < maxDepth && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Reply</span>
              </button>
            )}

            {/* Flag Button */}
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
              <Flag className="w-3 h-3" />
              <span>Report</span>
            </button>

            {/* More Options */}
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 pl-0">
              <CommentForm
                postId=""
                postType="post"
                onSubmit={handleReplySubmit}
                placeholder={`Reply to ${comment.isAnonymous ? 'Anonymous' : comment.user.displayName}...`}
                isReply={true}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {/* Toggle Replies Button */}
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 mb-2"
              >
                {showReplies ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hide {comment.replies.length} replies</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Show {comment.replies.length} replies</span>
                  </>
                )}
              </button>

              {/* Replies List */}
              {showReplies && (
                <div className="space-y-3">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      onStar={onStar}
                      onReply={onReply}
                      isReply={true}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}