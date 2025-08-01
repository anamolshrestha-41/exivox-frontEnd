import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Send, Smile, Paperclip, Users, Video, BarChart3, MoreVertical } from 'lucide-react'
import { GroupMessage, GroupMember, TypingIndicator, Poll } from '@types/group'
import { useAuthStore } from '@store/authStore'
import ChatMessage from './ChatMessage'
import MembersList from './MembersList'
import VideosPanel from './VideosPanel'
import CreatePollModal from './CreatePollModal'

export default function GroupChat() {
  const { groupId } = useParams()
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<GroupMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [members, setMembers] = useState<GroupMember[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([])
  const [showMembers, setShowMembers] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [showPollModal, setShowPollModal] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Mock data
    setMembers([
      {
        id: '1',
        username: 'sarah_dev',
        displayName: 'Sarah Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        role: 'admin',
        joinedAt: '2024-01-01T00:00:00Z',
        isOnline: true
      },
      {
        id: '2',
        username: 'mike_codes',
        displayName: 'Mike Coder',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'moderator',
        joinedAt: '2024-01-02T00:00:00Z',
        isOnline: true
      },
      {
        id: '3',
        username: 'alex_teacher',
        displayName: 'Alex Teacher',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        role: 'member',
        joinedAt: '2024-01-03T00:00:00Z',
        isOnline: false,
        lastSeen: '2024-01-15T10:30:00Z'
      }
    ])

    setMessages([
      {
        id: '1',
        groupId: groupId!,
        userId: '1',
        user: {
          id: '1',
          username: 'sarah_dev',
          displayName: 'Sarah Developer',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          role: 'admin',
          joinedAt: '2024-01-01T00:00:00Z',
          isOnline: true
        },
        content: 'Welcome to the React Developers group! 🎉',
        type: 'text',
        timestamp: '2024-01-15T09:00:00Z',
        reactions: [
          { emoji: '👍', users: ['2', '3'], count: 2 },
          { emoji: '🎉', users: ['2'], count: 1 }
        ],
        isEdited: false
      },
      {
        id: '2',
        groupId: groupId!,
        userId: '2',
        user: {
          id: '2',
          username: 'mike_codes',
          displayName: 'Mike Coder',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          role: 'moderator',
          joinedAt: '2024-01-02T00:00:00Z',
          isOnline: true
        },
        content: 'Thanks for creating this space! Looking forward to sharing knowledge.',
        type: 'text',
        timestamp: '2024-01-15T09:05:00Z',
        reactions: [],
        isEdited: false
      }
    ])
  }, [groupId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message: GroupMessage = {
      id: Date.now().toString(),
      groupId: groupId!,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.username,
        avatar: user.avatar,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        isOnline: true
      },
      content: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      reactions: [],
      isEdited: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(false)
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)
    
    if (!isTyping && value.trim()) {
      setIsTyping(true)
      // Simulate typing indicator
    }

    // Clear typing after 2 seconds of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const handleReaction = (messageId: string, emoji: string) => {
    if (!user) return

    setMessages(prev => prev.map(message => {
      if (message.id === messageId) {
        const existingReaction = message.reactions.find(r => r.emoji === emoji)
        
        if (existingReaction) {
          if (existingReaction.users.includes(user.id)) {
            // Remove reaction
            return {
              ...message,
              reactions: message.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, users: r.users.filter(id => id !== user.id), count: r.count - 1 }
                  : r
              ).filter(r => r.count > 0)
            }
          } else {
            // Add reaction
            return {
              ...message,
              reactions: message.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, users: [...r.users, user.id], count: r.count + 1 }
                  : r
              )
            }
          }
        } else {
          // New reaction
          return {
            ...message,
            reactions: [...message.reactions, { emoji, users: [user.id], count: 1 }]
          }
        }
      }
      return message
    }))
  }

  const handleCreatePoll = (poll: Poll) => {
    const pollMessage: GroupMessage = {
      id: Date.now().toString(),
      groupId: groupId!,
      userId: user!.id,
      user: {
        id: user!.id,
        username: user!.username,
        displayName: user!.username,
        avatar: user!.avatar,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        isOnline: true
      },
      content: JSON.stringify(poll),
      type: 'poll',
      timestamp: new Date().toISOString(),
      reactions: [],
      isEdited: false
    }

    setMessages(prev => [...prev, pollMessage])
  }

  return (
    <div className="flex-1 flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">R</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">React Developers</h2>
                <p className="text-sm text-gray-500">{members.length} members</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowVideos(!showVideos)}
                className={`p-2 rounded-lg transition-colors ${
                  showVideos ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowMembers(!showMembers)}
                className={`p-2 rounded-lg transition-colors ${
                  showMembers ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onReaction={handleReaction}
              currentUserId={user?.id}
            />
          ))}
          
          {/* Typing Indicators */}
          {typingUsers.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>
                {typingUsers.map(t => t.username).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setShowPollModal(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Create Poll"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Side Panels */}
      {showMembers && (
        <MembersList
          members={members}
          onClose={() => setShowMembers(false)}
        />
      )}
      
      {showVideos && (
        <VideosPanel
          groupId={groupId!}
          onClose={() => setShowVideos(false)}
        />
      )}

      {/* Create Poll Modal */}
      {showPollModal && (
        <CreatePollModal
          onClose={() => setShowPollModal(false)}
          onCreatePoll={handleCreatePoll}
        />
      )}
    </div>
  )
}