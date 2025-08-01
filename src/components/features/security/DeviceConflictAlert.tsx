import { AlertTriangle, X } from 'lucide-react'

interface DeviceConflictAlertProps {
  isVisible: boolean
  onClose: () => void
  onLogout: () => void
}

export default function DeviceConflictAlert({ isVisible, onClose, onLogout }: DeviceConflictAlertProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-mx-4 animate-slideUp">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Device Conflict Detected</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your account is being used on another device</p>
            </div>
            <button
              onClick={onClose}
              className="ml-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            For your security, you can only be logged in on one device at a time. Please choose an action below.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={onLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout Other Device
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Stay Here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}