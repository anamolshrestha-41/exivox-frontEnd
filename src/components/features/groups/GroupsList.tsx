import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Users, Lock, Hash, Dot } from 'lucide-react'
import { Group } from '@types/group'

interface GroupsListProps {
  onCreateGroup: () => void
}

export default function GroupsList({ onCreateGroup }: GroupsListProps) {
  const [groups, setGroups] = useState<Group[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'joined' | 'discover'>('joined')
  const navigate = useNavigate()

  useEffect(() => {
    // Mock data
    setGroups([
      {
        id: '1',
        name: 'React Developers',
        description: 'A community for React developers to share knowledge and best practices.',
        avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100',
        memberCount: 1234,
        isPrivate: false,
        adminIds: ['admin1'],
        moderatorIds: ['mod1'],
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: '2024-01-15T10:30:00Z',
        category: 'Technology',
        tags: ['React', 'JavaScript', 'Frontend']
      },
      {
        id: '2',
        name: 'Web Design Hub',
        description: 'Share your designs, get feedback, and learn from other designers.',
        avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100',
        memberCount: 856,
        isPrivate: false,
        adminIds: ['admin2'],
        moderatorIds: [],
        createdAt: '2024-01-02T00:00:00Z',
        lastActivity: '2024-01-15T09:15:00Z',
        category: 'Design',
        tags: ['Design', 'UI', 'UX']
      },
      {
        id: '3',
        name: 'JavaScript Masters',
        description: 'Advanced JavaScript concepts, frameworks, and modern development.',
        avatar: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100',
        memberCount: 2103,
        isPrivate: true,
        adminIds: ['admin3'],
        moderatorIds: ['mod2', 'mod3'],
        createdAt: '2024-01-03T00:00:00Z',
        lastActivity: '2024-01-15T11:45:00Z',
        category: 'Technology',
        tags: ['JavaScript', 'Advanced', 'Programming']
      }
    ])
  }, [])

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const joinedGroups = filteredGroups.filter(group => 
    activeTab === 'joined' ? true : !group.isPrivate
  )

  const handleJoinGroup = (groupId: string) => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <button
            onClick={onCreateGroup}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('joined')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'joined'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Groups
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'discover'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Discover
          </button>
        </div>
      </div>

      {/* Groups List */}
      <div className="p-6">
        {joinedGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'joined' ? 'No groups joined yet' : 'No groups found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'joined' 
                ? 'Join groups to connect with like-minded learners'
                : 'Try adjusting your search terms'
              }
            </p>
            {activeTab === 'joined' && (
              <button
                onClick={onCreateGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Group
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleJoinGroup(group.id)}
              >
                {/* Group Avatar */}
                <div className="flex items-center space-x-3 mb-4">
                  {group.avatar ? (
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Hash className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 truncate">{group.name}</h3>
                      {group.isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{group.memberCount.toLocaleString()} members</span>
                      <Dot className="w-3 h-3" />
                      <span>{group.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {group.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {group.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{group.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Active {new Date(group.lastActivity).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleJoinGroup(group.id)
                    }}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeTab === 'joined'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {activeTab === 'joined' ? 'Joined' : 'Join'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}