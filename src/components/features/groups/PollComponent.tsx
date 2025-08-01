import { useState } from 'react'
import { BarChart3, Clock, Users } from 'lucide-react'
import { Poll } from '@types/group'
import { formatDistanceToNow } from 'date-fns'

interface PollComponentProps {
  poll: Poll
}

export default function PollComponent({ poll }: PollComponentProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)

  const totalVotes = poll.options.reduce((sum, option) => sum + option.count, 0)
  const isExpired = poll.expiresAt ? new Date(poll.expiresAt) < new Date() : false

  const handleVote = (optionId: string) => {
    if (hasVoted || isExpired) return

    if (poll.type === 'single') {
      setSelectedOptions([optionId])
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    }
  }

  const submitVote = () => {
    if (selectedOptions.length === 0) return
    
    // Here you would typically send the vote to the server
    console.log('Voting for options:', selectedOptions)
    setHasVoted(true)
  }

  const getPercentage = (count: number) => {
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
      {/* Poll Header */}
      <div className="flex items-start space-x-2 mb-3">
        <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{poll.question}</h3>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}</span>
            </div>
            {poll.expiresAt && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {isExpired 
                    ? 'Expired' 
                    : `Expires ${formatDistanceToNow(new Date(poll.expiresAt), { addSuffix: true })}`
                  }
                </span>
              </div>
            )}
            <span className="capitalize">{poll.type} choice</span>
            {poll.isAnonymous && <span>Anonymous</span>}
          </div>
        </div>
      </div>

      {/* Poll Options */}
      <div className="space-y-2 mb-4">
        {poll.options.map((option) => {
          const percentage = getPercentage(option.count)
          const isSelected = selectedOptions.includes(option.id)
          const showResults = hasVoted || isExpired

          return (
            <div key={option.id} className="relative">
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted || isExpired}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  showResults
                    ? 'cursor-default'
                    : 'hover:bg-gray-50 cursor-pointer'
                } ${
                  isSelected && !showResults
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {!showResults && (
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        poll.type === 'single' ? 'rounded-full' : 'rounded'
                      } ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className={`w-2 h-2 bg-white ${
                            poll.type === 'single' ? 'rounded-full' : 'rounded-sm'
                          }`} />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {option.text}
                    </span>
                  </div>
                  {showResults && (
                    <span className="text-sm font-medium text-gray-600">
                      {percentage}%
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                {showResults && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Vote Button */}
      {!hasVoted && !isExpired && selectedOptions.length > 0 && (
        <button
          onClick={submitVote}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Submit Vote
        </button>
      )}

      {/* Poll Status */}
      {hasVoted && (
        <div className="text-center text-sm text-green-600 font-medium">
          ✓ Vote submitted
        </div>
      )}

      {isExpired && (
        <div className="text-center text-sm text-gray-500 font-medium">
          This poll has expired
        </div>
      )}
    </div>
  )
}