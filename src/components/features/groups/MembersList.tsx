import { useState } from 'react'
import { X, Search, Crown, Shield, MoreVertical, UserMinus, UserPlus } from 'lucide-react'
import { GroupMember } from '@types/group'
import { formatDistanceToNow } from 'date-fns'

interface MembersListProps {
  members: GroupMember[]
  onClose: () => void
}

export default function MembersList({ members, onClose }: MembersListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'online' | 'admins'>('all')

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'online' && member.isOnline) ||
                         (filter === 'admins' && (member.role === 'admin' || member.role === 'moderator'))
    
    return matchesSearch && matchesFilter
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-600" />
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-yellow-700 bg-yellow-100'
      case 'moderator':
        return 'text-blue-700 bg-blue-100'
      default:
        return 'text-gray-700 bg-gray-100'
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Members ({members.length})
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'online'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setFilter('admins')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'admins'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Staff
          </button>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMembers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No members found</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                {/* Avatar with online status */}
                <div className="relative">
                  <img
                    src={member.avatar || '/default-avatar.png'}
                    alt={member.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.displayName}
                    </p>
                    {getRoleIcon(member.role)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-500 truncate">
                      @{member.username}
                    </p>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {member.isOnline 
                      ? 'Online' 
                      : member.lastSeen 
                        ? `Last seen ${formatDistanceToNow(new Date(member.lastSeen), { addSuffix: true })}`
                        : 'Offline'
                    }
                  </p>
                </div>

                {/* Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-1">
                    <button
                      className="p-1 hover:bg-gray-200 rounded text-gray-600"
                      title="Send message"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-200 rounded text-gray-600"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Members */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Invite Members</span>
        </button>
      </div>
    </div>
  )
}