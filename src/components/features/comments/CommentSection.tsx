import { useState, useEffect } from 'react'
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Comment } from '../../../types/comment'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

interface CommentSectionProps {
  postId: string
  postType: 'post' | 'video' | 'qa'
  initialComments?: Comment[]
  isCollapsible?: boolean
  maxHeight?: string
}

export default function CommentSection({ 
  postId, 
  postType, 
  initialComments = [], 
  isCollapsible = true,
  maxHeight = 'max-h-96'
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isExpanded, setIsExpanded] = useState(!isCollapsible)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')

  useEffect(() => {
    // Mock data - replace with API call
    if (initialComments.length === 0) {
      setLoading(true)
      setTimeout(() => {
        setComments([
          {
            id: '1',
            userId: '1',
            user: {
              id: '1',
              username: 'sarah_dev',
              displayName: 'Sarah Developer',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
              isVerified: true
            },
            content: 'Great explanation! This really helped me understand the concept better. Thanks for sharing! 🙏',
            isAnonymous: false,
            stars: 12,
            isStarred: false,
            createdAt: '2024-01-15T10:30:00Z',
            isEdited: false,
            attachments: [],
            isFlagged: false,
            moderationStatus: 'approved',
            replies: [
              {
                id: '2',
                parentId: '1',
                userId: '2',
                user: {
                  id: '2',
                  username: 'mike_codes',
                  displayName: 'Mike Coder',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
                },
                content: 'Totally agree! The examples were super clear.',
                isAnonymous: false,
                stars: 3,
                isStarred: true,
                createdAt: '2024-01-15T10:45:00Z',
                isEdited: false,
                attachments: [],
                isFlagged: false,
                moderationStatus: 'approved'
              }
            ]
          },
          {
            id: '3',
            userId: '3',
            user: {
              id: '3',
              username: 'anonymous',
              displayName: 'Anonymous User',
              avatar: ''
            },
            content: 'I have a different perspective on this. While the approach works, there might be performance implications with larger datasets.',
            isAnonymous: true,
            stars: 8,
            isStarred: false,
            createdAt: '2024-01-15T11:00:00Z',
            isEdited: false,
            attachments: [],
            isFlagged: false,
            moderationStatus: 'approved'
          },
          {
            id: '4',
            userId: '4',
            user: {
              id: '4',
              username: 'flagged_user',
              displayName: 'Flagged User',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
            },
            content: 'This comment contains inappropriate content that has been flagged by the community.',
            isAnonymous: false,
            stars: 0,
            isStarred: false,
            createdAt: '2024-01-15T11:15:00Z',
            isEdited: false,
            attachments: [],
            isFlagged: true,
            moderationStatus: 'warning',
            moderationReason: 'Inappropriate language detected'
          }
        ])
        setLoading(false)
      }, 1000)
    }
  }, [initialComments])

  const handleAddComment = (commentData: any) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      user: {
        id: 'current-user',
        username: 'current_user',
        displayName: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      content: commentData.content,
      isAnonymous: commentData.isAnonymous,
      stars: 0,
      isStarred: false,
      createdAt: new Date().toISOString(),
      isEdited: false,
      attachments: commentData.attachments || [],
      isFlagged: false,
      moderationStatus: 'approved',
      parentId: commentData.parentId
    }

    if (commentData.parentId) {
      // Add as reply
      setComments(prev => prev.map(comment => {
        if (comment.id === commentData.parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment]
          }
        }
        return comment
      }))
    } else {
      // Add as top-level comment
      setComments(prev => [newComment, ...prev])
    }
  }

  const handleStarComment = (commentId: string) => {
    const updateComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isStarred: !comment.isStarred,
            stars: comment.isStarred ? comment.stars - 1 : comment.stars + 1
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComment(comment.replies)
          }
        }
        return comment
      })
    }
    setComments(updateComment)
  }

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'popular':
        return b.stars - a.stars
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + (comment.replies?.length || 0)
  }, 0)

  if (loading) {
    return (
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {/* Header */}
      {isCollapsible && (
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">
                {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      )}

      {/* Comments Content */}
      {isExpanded && (
        <>
          {/* Sort Options */}
          {comments.length > 1 && (
            <div className="px-4 py-2 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="flex space-x-2">
                  {[
                    { key: 'newest', label: 'Newest' },
                    { key: 'popular', label: 'Popular' },
                    { key: 'oldest', label: 'Oldest' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key as any)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        sortBy === key
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className={`${maxHeight} overflow-y-auto`}>
            {sortedComments.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No comments yet</p>
                <p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {sortedComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onStar={handleStarComment}
                    onReply={(parentId, content, isAnonymous) => 
                      handleAddComment({ content, isAnonymous, parentId })
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="border-t border-gray-200 bg-white">
            <CommentForm
              postId={postId}
              postType={postType}
              onSubmit={handleAddComment}
              placeholder="Add a comment..."
            />
          </div>
        </>
      )}
    </div>
  )
}