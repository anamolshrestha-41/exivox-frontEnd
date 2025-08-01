import { Search, Bell, MessageCircle } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

export default function Header() {
  const { user } = useAuthStore()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">Exivox</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-gray-600" />
          </button>
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt={user?.username}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  )
}