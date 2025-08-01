import { useState } from 'react'
import { Camera, Edit3, MapPin, Link, Calendar, CheckCircle, Settings, UserPlus, MessageCircle } from 'lucide-react'
import EditProfileModal from './EditProfileModal'

interface ProfileUser {
  id: string
  username: string
  displayName: string
  email: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  isVerified: boolean
  createdAt: string
  website?: string
  location?: string
}

interface ProfileStats {
  totalPosts: number
  totalLikes: number
  totalViews: number
  totalComments: number
}

type ViewMode = 'owner' | 'visitor'

interface ProfileHeaderProps {
  user: ProfileUser
  stats: ProfileStats | null
  viewMode: ViewMode
  onUserUpdate: (user: ProfileUser) => void
}

export default function ProfileHeader({ user, stats, viewMode, onUserUpdate }: ProfileHeaderProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleAvatarChange = () => {
    if (viewMode !== 'owner') return
    
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        onUserUpdate({ ...user, avatar: url })
      }
    }
    input.click()
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {viewMode === 'owner' && (
            <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="px-6 pb-6">
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 relative">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
              />
              {viewMode === 'owner' && (
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
                    {user.isVerified && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600">@{user.username}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  {viewMode === 'owner' ? (
                    <>
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleFollow}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isFollowing
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <p className="text-gray-800 leading-relaxed">{user.bio}</p>
                
                {/* Additional Info */}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  {user.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-1">
                      <Link className="w-4 h-4" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {user.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatTimeAgo(user.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">{user.following.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">Following</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{user.followers.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">Followers</span>
                </div>
                {stats && (
                  <>
                    <div>
                      <span className="font-semibold text-gray-900">{stats.totalPosts.toLocaleString()}</span>
                      <span className="text-gray-600 ml-1">Posts</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{stats.totalLikes.toLocaleString()}</span>
                      <span className="text-gray-600 ml-1">Likes</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
            onUserUpdate(updatedUser)
            setShowEditModal(false)
          }}
        />
      )}
    </>
  )
}