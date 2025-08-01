import { Plus } from 'lucide-react'

const mockStories = [
  { id: '1', username: 'sarah_dev', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', hasStory: true },
  { id: '2', username: 'mike_codes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', hasStory: true },
  { id: '3', username: 'alex_teacher', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', hasStory: true },
  { id: '4', username: 'ui_designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', hasStory: true },
  { id: '5', username: 'code_ninja', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', hasStory: true },
]

export default function Stories() {
  return (
    <div className="bg-white border-b border-gray-200 sm:rounded-lg sm:border sm:shadow-sm sm:mb-4 p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Add Story */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="Your story"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <span className="text-xs text-gray-600 max-w-[64px] truncate">Your story</span>
        </div>

        {/* Stories */}
        {mockStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 max-w-[64px] truncate">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}