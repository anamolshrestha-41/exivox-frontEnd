import { useState } from 'react'
import { Plus, Lock, Edit3, Trash2, Eye } from 'lucide-react'
import CreateFolderModal from './CreateFolderModal'

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

type ViewMode = 'owner' | 'visitor'

interface ProfileFoldersProps {
  folders: ContentFolder[]
  viewMode: ViewMode
  onFoldersUpdate: (folders: ContentFolder[]) => void
}

export default function ProfileFolders({ folders, viewMode, onFoldersUpdate }: ProfileFoldersProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingFolder, setEditingFolder] = useState<ContentFolder | null>(null)

  const visibleFolders = viewMode === 'owner' ? folders : folders.filter(f => f.isPublic)

  const handleCreateFolder = (folderData: Omit<ContentFolder, 'id' | 'createdAt' | 'posts'>) => {
    const newFolder: ContentFolder = {
      ...folderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      posts: []
    }
    onFoldersUpdate([...folders, newFolder])
  }

  const handleEditFolder = (folder: ContentFolder) => {
    setEditingFolder(folder)
    setShowCreateModal(true)
  }

  const handleUpdateFolder = (folderData: Omit<ContentFolder, 'id' | 'createdAt' | 'posts'>) => {
    if (!editingFolder) return
    
    const updatedFolder: ContentFolder = {
      ...editingFolder,
      ...folderData
    }
    
    onFoldersUpdate(folders.map(f => f.id === editingFolder.id ? updatedFolder : f))
    setEditingFolder(null)
  }

  const handleDeleteFolder = (folderId: string) => {
    if (confirm('Are you sure you want to delete this folder?')) {
      onFoldersUpdate(folders.filter(f => f.id !== folderId))
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {viewMode === 'owner' ? 'Content Folders' : 'Public Collections'}
          </h2>
          {viewMode === 'owner' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Folder</span>
            </button>
          )}
        </div>

        {visibleFolders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {viewMode === 'owner' ? 'No folders yet' : 'No public collections'}
            </h3>
            <p className="text-gray-600 mb-4">
              {viewMode === 'owner' 
                ? 'Create folders to organize your content into collections'
                : 'This user hasn\'t shared any public collections yet'
              }
            </p>
            {viewMode === 'owner' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Folder
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleFolders.map((folder) => (
              <div
                key={folder.id}
                className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {folder.thumbnail ? (
                    <img
                      src={folder.thumbnail}
                      alt={folder.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">
                        {folder.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  
                  {/* Privacy indicator */}
                  <div className="absolute top-2 left-2">
                    {!folder.isPublic && (
                      <div className="bg-black bg-opacity-50 rounded-full p-1">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Owner actions */}
                  {viewMode === 'owner' && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditFolder(folder)
                          }}
                          className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteFolder(folder.id)
                          }}
                          className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Post count overlay */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full px-2 py-1">
                    <span className="text-white text-xs font-medium">
                      {folder.postCount} {folder.postCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                </div>

                {/* Folder info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {folder.name}
                  </h3>
                  {folder.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {folder.description}
                    </p>
                  )}
                  
                  {viewMode === 'visitor' && (
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">
                        {folder.postCount} items
                      </span>
                      <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700">
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Folder Modal */}
      {showCreateModal && (
        <CreateFolderModal
          folder={editingFolder}
          onClose={() => {
            setShowCreateModal(false)
            setEditingFolder(null)
          }}
          onSave={editingFolder ? handleUpdateFolder : handleCreateFolder}
        />
      )}
    </>
  )
}