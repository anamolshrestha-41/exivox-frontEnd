import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from '../../components/features/profile/ProfileHeader'
import ProfileFolders from '../../components/features/profile/ProfileFolders'
import ProfileContent from '../../components/features/profile/ProfileContent'

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

interface ContentFolder {
  id: string
  name: string
  description?: string
  thumbnail?: string
  postCount: number
  isPublic: boolean
  createdAt: string
  posts: string[]
}

interface ProfileStats {
  totalPosts: number
  totalLikes: number
  totalViews: number
  totalComments: number
}

type ContentType = 'all' | 'videos' | 'images' | 'reels' | 'questions'
type ViewMode = 'owner' | 'visitor'

export default function ProfilePage() {
  const { userId } = useParams()
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null)
  const [folders, setFolders] = useState<ContentFolder[]>([])
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [activeTab, setActiveTab] = useState<ContentType>('all')
  const [loading, setLoading] = useState(true)
  
  // Mock current user - in real app, get from auth context
  const currentUserId = '1'
  const viewMode: ViewMode = !userId || userId === currentUserId ? 'owner' : 'visitor'
  const isOwnProfile = viewMode === 'owner'

  useEffect(() => {
    // Mock data - replace with API calls
    setTimeout(() => {
      setProfileUser({
        id: userId || currentUserId,
        username: isOwnProfile ? 'demo_user' : 'sarah_dev',
        displayName: isOwnProfile ? 'Demo User' : 'Sarah Developer',
        email: isOwnProfile ? 'demo@example.com' : 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        bio: 'Full-stack developer passionate about React, Node.js, and modern web technologies. Always learning and sharing knowledge! 🚀',
        followers: 1250,
        following: 340,
        isVerified: true,
        createdAt: '2023-01-15T00:00:00Z',
        website: 'https://sarahdev.com',
        location: 'San Francisco, CA'
      })
      
      setFolders([
        {
          id: '1',
          name: 'React Tutorials',
          description: 'My favorite React learning resources',
          thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300',
          postCount: 15,
          isPublic: true,
          createdAt: '2024-01-01T00:00:00Z',
          posts: ['1', '2', '3']
        },
        {
          id: '2',
          name: 'JavaScript Tips',
          description: 'Advanced JS concepts and tricks',
          thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300',
          postCount: 8,
          isPublic: true,
          createdAt: '2024-01-05T00:00:00Z',
          posts: ['4', '5']
        },
        {
          id: '3',
          name: 'Private Notes',
          description: 'Personal development notes',
          thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300',
          postCount: 5,
          isPublic: false,
          createdAt: '2024-01-10T00:00:00Z',
          posts: ['6']
        }
      ])
      
      setStats({
        totalPosts: 45,
        totalLikes: 2340,
        totalViews: 15600,
        totalComments: 890
      })
      
      setLoading(false)
    }, 1000)
  }, [userId, isOwnProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                <div className="space-y-3">
                  <div className="h-8 bg-gray-300 rounded w-48"></div>
                  <div className="h-4 bg-gray-300 rounded w-64"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ProfileHeader 
          user={profileUser}
          stats={stats}
          viewMode={viewMode}
          onUserUpdate={setProfileUser}
        />
        
        <ProfileFolders 
          folders={folders}
          viewMode={viewMode}
          onFoldersUpdate={setFolders}
        />
        
        <ProfileContent 
          userId={profileUser.id}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          viewMode={viewMode}
        />
      </div>
    </div>
  )
}