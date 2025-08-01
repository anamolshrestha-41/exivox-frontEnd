import { useState } from 'react'
import { Image, Video, FileText, Play, X } from 'lucide-react'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'reel'>('text')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && selectedFiles.length === 0) return
    
    console.log('Creating post:', { content, files: selectedFiles, type: postType })
    setContent('')
    setSelectedFiles([])
    setPostType('text')
  }

  const handleFileSelect = (type: 'image' | 'video' | 'reel') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = type === 'image'
    input.accept = type === 'image' ? 'image/*' : 'video/*'
    
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      setSelectedFiles(prev => [...prev, ...files])
      setPostType(type)
    }
    
    input.click()
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    if (selectedFiles.length === 1) setPostType('text')
  }

  return (
    <div className="bg-white border-b border-gray-200 sm:rounded-lg sm:border sm:shadow-sm sm:mb-4">
      <div className="p-4">
        <div className="flex space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your knowledge, ask a question, or start a discussion..."
                className="w-full p-3 border-0 resize-none focus:outline-none text-lg placeholder-gray-500"
                rows={3}
              />
              
              {/* File Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-32 bg-black rounded-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-1">
                  <button 
                    type="button" 
                    onClick={() => handleFileSelect('image')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Image className="w-5 h-5" />
                    <span className="hidden sm:inline">Photo</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFileSelect('video')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    <span className="hidden sm:inline">Video</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFileSelect('reel')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span className="hidden sm:inline">Reel</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <FileText className="w-5 h-5" />
                    <span className="hidden sm:inline">Article</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() && selectedFiles.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}