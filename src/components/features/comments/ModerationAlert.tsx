import { AlertTriangle, Eye, EyeOff, Shield, Flag } from 'lucide-react'
import { Comment } from '../../../types/comment'

interface ModerationAlertProps {
  comment: Comment
  onToggleDetails: () => void
  showDetails: boolean
}

export default function ModerationAlert({ comment, onToggleDetails, showDetails }: ModerationAlertProps) {
  const getModerationConfig = () => {
    switch (comment.moderationStatus) {
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-800',
          title: 'Content Warning',
          message: 'This comment has been flagged for review'
        }
      case 'pending':
        return {
          icon: Shield,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-800',
          title: 'Under Review',
          message: 'This comment is being reviewed by moderators'
        }
      case 'rejected':
        return {
          icon: Flag,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-800',
          title: 'Content Removed',
          message: 'This comment violates community guidelines'
        }
      default:
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-800',
          title: 'Flagged Content',
          message: 'This comment has been reported'
        }
    }
  }

  const config = getModerationConfig()
  const Icon = config.icon

  return (
    <div className={`mb-3 p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-sm font-medium ${config.textColor}`}>
                {config.title}
              </h4>
              <p className={`text-xs ${config.textColor} opacity-80 mt-1`}>
                {config.message}
              </p>
            </div>
            
            <button
              onClick={onToggleDetails}
              className={`flex items-center space-x-1 text-xs ${config.textColor} hover:opacity-80 transition-opacity`}
            >
              {showDetails ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Details</span>
                </>
              )}
            </button>
          </div>

          {/* Detailed Information */}
          {showDetails && (
            <div className={`mt-3 pt-3 border-t ${config.borderColor}`}>
              <div className="space-y-2 text-xs">
                {comment.moderationReason && (
                  <div>
                    <span className={`font-medium ${config.textColor}`}>Reason: </span>
                    <span className={`${config.textColor} opacity-80`}>
                      {comment.moderationReason}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className={`font-medium ${config.textColor}`}>Status: </span>
                  <span className={`${config.textColor} opacity-80 capitalize`}>
                    {comment.moderationStatus}
                  </span>
                </div>

                {comment.isFlagged && (
                  <div>
                    <span className={`font-medium ${config.textColor}`}>Community Reports: </span>
                    <span className={`${config.textColor} opacity-80`}>
                      Multiple users have reported this content
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-3">
                  <button className={`text-xs ${config.textColor} hover:opacity-80 underline`}>
                    Appeal Decision
                  </button>
                  <button className={`text-xs ${config.textColor} hover:opacity-80 underline`}>
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}