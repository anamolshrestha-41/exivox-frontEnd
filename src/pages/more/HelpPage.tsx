import { ArrowLeft, Search, MessageCircle, Book, Users, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of using Exivox',
    articles: ['Creating your first post', 'Setting up your profile', 'Finding communities']
  },
  {
    id: 'posts-content',
    title: 'Posts & Content',
    icon: MessageCircle,
    description: 'How to create and manage your content',
    articles: ['Posting images and videos', 'Using hashtags effectively', 'Editing your posts']
  },
  {
    id: 'groups-chat',
    title: 'Groups & Chat',
    icon: Users,
    description: 'Connect with others and join discussions',
    articles: ['Joining groups', 'Starting conversations', 'Group moderation']
  },
  {
    id: 'account-settings',
    title: 'Account & Settings',
    icon: Settings,
    description: 'Manage your account and privacy',
    articles: ['Privacy settings', 'Notification preferences', 'Account security']
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Link to="/more" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Find answers and get support</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Help Categories */}
          <div className="space-y-4">
            {helpCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{category.description}</p>
                      <div className="space-y-1">
                        {category.articles.map((article, index) => (
                          <button
                            key={index}
                            className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {article}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Still need help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}