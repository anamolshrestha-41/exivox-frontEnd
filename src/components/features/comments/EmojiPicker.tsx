import { useState } from 'react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

const emojiCategories = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
  'Gestures': ['👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
  'Objects': ['💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💤', '📚', '📖', '💡', '🔥', '⭐', '🌟', '✨', '⚡', '☄️']
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState('Smileys')

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64">
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-3 border-b border-gray-200 pb-2">
        {Object.keys(emojiCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
        {emojiCategories[activeCategory as keyof typeof emojiCategories].map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="w-6 h-6 flex items-center justify-center text-lg hover:bg-gray-100 rounded transition-colors"
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Recently Used (placeholder) */}
      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Recently used</p>
        <div className="flex space-x-1">
          {['😀', '👍', '❤️', '🔥', '💯'].map((emoji, index) => (
            <button
              key={index}
              onClick={() => onEmojiSelect(emoji)}
              className="w-6 h-6 flex items-center justify-center text-lg hover:bg-gray-100 rounded transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}