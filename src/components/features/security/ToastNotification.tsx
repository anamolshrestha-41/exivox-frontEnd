import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, X } from 'lucide-react'

interface ToastNotificationProps {
  message: string
  type: 'success' | 'error' | 'warning'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function ToastNotification({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastNotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(onClose, 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: AlertTriangle,
    warning: AlertTriangle
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  }

  const Icon = icons[type]

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`flex items-center space-x-3 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setIsAnimating(false)
            setTimeout(onClose, 300)
          }}
          className="ml-2 hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}