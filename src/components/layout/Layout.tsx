import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'
import AIAssistant from '@components/features/ai-assistant/AIAssistant'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      <Header />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className={`flex-1 ${isHomePage ? '' : 'lg:ml-64'} pt-16`}>
          {isHomePage ? (
            children
          ) : (
            <div className="max-w-4xl mx-auto p-6">
              {children}
            </div>
          )}
        </main>
        <AIAssistant />
      </div>
      <MobileNav />
    </div>
  )
}