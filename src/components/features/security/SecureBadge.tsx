import { Shield } from 'lucide-react'

interface SecureBadgeProps {
  size?: 'sm' | 'md'
  showText?: boolean
}

export default function SecureBadge({ size = 'sm', showText = false }: SecureBadgeProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  }

  return (
    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
      <Shield className={`${sizeClasses[size]} animate-pulse`} />
      {showText && (
        <span className="text-xs font-medium">End-to-end encrypted</span>
      )}
    </div>
  )
}