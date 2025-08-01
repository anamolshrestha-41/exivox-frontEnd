import { NavLink } from 'react-router-dom'
import { Home, User, MessageSquare, Users, HelpCircle, Compass } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/groups', icon: Users, label: 'Groups' },
  { to: '/qa', icon: HelpCircle, label: 'Q&A' },
  { to: '/explore', icon: Compass, label: 'Explore' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white border-r border-gray-200 z-40">
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}