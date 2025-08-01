import { useState, useRef } from 'react'
import { Send, Smile, Paperclip, X, Image, FileText, UserX, User } from 'lucide-react'
import { CommentFormData } from '../../../types/comment'
import EmojiPicker from './EmojiPicker'

interface CommentFormProps {
  postId: string
  postType: 'post' | 'video' | 'qa'
  onSubmit: (data: CommentFormData) => void
  onCancel?: () => void
  placeholder?: string
  isReply?: boolean
  maxLength?: number
}

export default function CommentForm({
  postId,
  postType,
  onSubmit,
  onCancel,
  placeholder = 'Add a comment...',
  isReply = false,
  maxLength = 500
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && attachments.length === 0) return

    setIsSubmitting(true)
    
    try {
      await onSubmit({
        content: content.trim(),
        isAnonymous,
        attachments,
        parentId: isReply ? postId : undefined
      })
      
      // Reset form
      setContent('')
      setIsAnonymous(false)
      setAttachments([])
      setShowEmojiPicker(false)
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/pdf' ||
                         file.type.startsWith('text/')
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit
      return isValidType && isValidSize
    })
    
    setAttachments(prev => [...prev, ...validFiles].slice(0, 3)) // Max 3 files
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newContent = content.slice(0, start) + emoji + content.slice(end)
      setContent(newContent)
      
      // Reset cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length
        textarea.focus()
      }, 0)
    }
    setShowEmojiPicker(false)
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  const isSubmitDisabled = (!content.trim() && attachments.length === 0) || isSubmitting

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main Input Area */}
        <div className="flex space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isAnonymous ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserX className="w-4 h-4 text-gray-600" />
              </div>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>

          {/* Input Container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                adjustTextareaHeight()
              }}
              placeholder={placeholder}
              className="w-full p-3 pr-10 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={1}
              maxLength={maxLength}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isReply) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute right-0 top-12 z-10">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="ml-11 space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
                {file.type.startsWith('image/') ? (
                  <Image className="w-4 h-4 text-blue-600" />
                ) : (
                  <FileText className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-sm text-gray-700 flex-1 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Form Controls */}
        <div className="flex items-center justify-between ml-11">
          <div className="flex items-center space-x-4">
            {/* Anonymous Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                {isAnonymous ? (
                  <>
                    <UserX className="w-3 h-3" />
                    <span>Anonymous</span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3" />
                    <span>Public</span>
                  </>
                )}
              </div>
            </label>

            {/* Attachment Button */}
            <button
              type="button"
              onClick={handleFileSelect}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              disabled={attachments.length >= 3}
            >
              <Paperclip className="w-3 h-3" />
              <span className="hidden sm:inline">Attach</span>
            </button>

            {/* Character Count */}
            <span className="text-xs text-gray-500">
              {content.length}/{maxLength}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {isReply && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-3 h-3" />
              )}
              <span>{isReply ? 'Reply' : 'Comment'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.txt,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}