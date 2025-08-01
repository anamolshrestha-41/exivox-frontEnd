import { useState } from 'react'
import { MoreHorizontal, Reply, Edit3, Trash2 } from 'lucide-react'
import { GroupMessage, Poll } from '@types/group'
import { formatDistanceToNow } from 'date-fns'
import PollComponent from './PollComponent'
import SecureBadge from '../security/SecureBadge'

interface ChatMessageProps {
  message: GroupMessage
  onReaction: (messageId: string, emoji: string) => void
  currentUserId?: string
}

const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡']

export default function ChatMessage({ message, onReaction, currentUserId }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  const isOwnMessage = message.userId === currentUserId
  const hasReactions = message.reactions.length > 0

  const renderContent = () => {
    switch (message.type) {
      case 'poll':
        const poll: Poll = JSON.parse(message.content)
        return <PollComponent poll={poll} />
      
      case 'system':
        return (
          <div className="text-center py-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {message.content}
            </span>
          </div>
        )
      
      case 'video':
        return (
          <div className="max-w-md">
            <video
              src={message.content}
              controls
              className="w-full rounded-lg"
              poster="/video-thumbnail.jpg"
            />
          </div>
        )
      
      default:
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-900 whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        )
    }
  }

  if (message.type === 'system') {
    return renderContent()
  }

  return (
    <div
      className={`flex space-x-3 group ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false)
        setShowEmojiPicker(false)
      }}
    >
      {/* Avatar */}
      {!isOwnMessage && (
        <img
          src={message.user.avatar || '/default-avatar.png'}
          alt={message.user.displayName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      )}

      <div className={`flex-1 max-w-lg ${isOwnMessage ? 'flex flex-col items-end' : ''}`}>
        {/* Message Header */}
        {!isOwnMessage && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm text-gray-900">
              {message.user.displayName}
            </span>
            {message.user.role === 'admin' && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                Admin
              </span>
            )}
            {message.user.role === 'moderator' && (
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                Mod
              </span>
            )}
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </span>
            {message.isEdited && (
              <span className="text-xs text-gray-400">(edited)</span>
            )}
            <SecureBadge size="sm" />
          </div>
        )}

        {/* Message Content */}
        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2 ${
              isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {renderContent()}
          </div>

          {/* Message Actions */}
          {showActions && (
            <div className={`absolute top-0 ${isOwnMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg px-2 py-1`}>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                title="Add reaction"
              >
                😊
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                title="Reply"
              >
                <Reply className="w-4 h-4" />
              </button>
              {isOwnMessage && (
                <>
                  <button
                    className="p-1 hover:bg-gray-100 rounded text-gray-600"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded text-gray-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                title="More"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className={`absolute top-8 ${isOwnMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-1 z-10`}>
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReaction(message.id, emoji)
                    setShowEmojiPicker(false)
                  }}
                  className="p-1 hover:bg-gray-100 rounded text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reactions */}
        {hasReactions && (
          <div className={`flex flex-wrap gap-1 mt-1 ${isOwnMessage ? 'justify-end' : ''}`}>
            {message.reactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => onReaction(message.id, reaction.emoji)}
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                  reaction.users.includes(currentUserId || '')
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Own message timestamp */}
        {isOwnMessage && (
          <div className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            {message.isEdited && <span className="ml-1">(edited)</span>}
          </div>
        )}
      </div>
    </div>
  )
}