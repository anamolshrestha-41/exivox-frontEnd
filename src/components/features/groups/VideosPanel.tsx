import { useState, useEffect } from 'react'
import { X, Upload, Play, Eye, Heart, MoreVertical, Search } from 'lucide-react'
import { GroupVideo } from '@types/group'
import { formatDistanceToNow } from 'date-fns'

interface VideosPanelProps {
  groupId: string
  onClose: () => void
}

export default function VideosPanel({ groupId, onClose }: VideosPanelProps) {
  const [videos, setVideos] = useState<GroupVideo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'views'>('recent')

  useEffect(() => {
    // Mock data
    setVideos([
      {
        id: '1',
        title: 'React Hooks Deep Dive',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
        duration: 1245, // seconds
        uploadedBy: 'sarah_dev',
        uploadedAt: '2024-01-15T10:30:00Z',
        views: 156,
        likes: 23
      },
      {
        id: '2',
        title: 'Building Custom React Components',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300',
        duration: 892,
        uploadedBy: 'mike_codes',
        uploadedAt: '2024-01-14T15:20:00Z',
        views: 89,
        likes: 12
      },
      {
        id: '3',
        title: 'State Management Patterns',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300',
        duration: 1567,
        uploadedBy: 'alex_teacher',
        uploadedAt: '2024-01-13T09:15:00Z',
        views: 234,
        likes: 45
      }
    ])
  }, [groupId])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes
      case 'views':
        return b.views - a.views
      case 'recent':
      default:
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    }
  })

  const handleUploadVideo = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log('Uploading video:', file.name)
        // Handle video upload
      }
    }
    input.click()
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Shared Videos
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUploadVideo}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Video</span>
        </button>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'views')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Liked</option>
          <option value="views">Most Viewed</option>
        </select>
      </div>

      {/* Videos List */}
      <div className="flex-1 overflow-y-auto">
        {sortedVideos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm mb-2">No videos shared yet</p>
            <p className="text-xs text-gray-400">
              {searchQuery ? 'Try adjusting your search' : 'Be the first to share a video!'}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-3">
            {sortedVideos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                {/* Video Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                    {video.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>by {video.uploadedBy}</span>
                    <span>{formatDistanceToNow(new Date(video.uploadedAt), { addSuffix: true })}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}