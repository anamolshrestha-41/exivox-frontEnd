import { Settings, Info, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const menuItems = [
  {
    id: 'settings',
    title: 'Settings & Privacy',
    icon: Settings,
    path: '/more/settings',
    description: 'Manage your account settings and privacy preferences'
  },
  {
    id: 'about',
    title: 'About Us',
    icon: Info,
    path: '/more/about',
    description: 'Learn more about Exivox and our mission'
  },
  {
    id: 'help',
    title: 'Help Center',
    icon: HelpCircle,
    path: '/more/help',
    description: 'Get help and find answers to common questions'
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: LogOut,
    path: '/logout',
    description: 'Sign out of your account'
  }
]

export default function MorePage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">More</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and get help</p>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}