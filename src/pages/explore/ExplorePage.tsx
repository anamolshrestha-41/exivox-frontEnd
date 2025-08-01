import { Search, TrendingUp, Users, BookOpen } from 'lucide-react'

const trendingTopics = [
  { name: 'React Hooks', posts: 1234, growth: '+15%' },
  { name: 'TypeScript', posts: 987, growth: '+8%' },
  { name: 'Web3', posts: 756, growth: '+23%' },
  { name: 'AI/ML', posts: 654, growth: '+12%' },
]

const suggestedGroups = [
  { name: 'React Developers', members: 15420, avatar: '🚀' },
  { name: 'UI/UX Design', members: 8930, avatar: '🎨' },
  { name: 'JavaScript Masters', members: 12340, avatar: '⚡' },
]

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search topics, users, groups..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-80"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <h3 className="font-medium text-gray-900">#{topic.name}</h3>
                  <p className="text-sm text-gray-500">{topic.posts} posts</p>
                </div>
                <span className="text-sm font-medium text-green-600">{topic.growth}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Groups */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Suggested Groups</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {suggestedGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    {group.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members.toLocaleString()} members</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">Featured Learning Paths</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-3"></div>
                <h3 className="font-medium text-gray-900 mb-1">Full Stack Development</h3>
                <p className="text-sm text-gray-500 mb-2">Learn modern web development from scratch</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">12 lessons</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}