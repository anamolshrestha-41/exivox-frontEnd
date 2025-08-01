import CommentSection from '../components/features/comments/CommentSection'

export default function CommentsDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Comment System Demo</h1>
        <p className="text-gray-600">
          Comprehensive comment system with anonymous posting, starring, moderation, and nested replies
        </p>
      </div>

      {/* Post Comment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            How to Build Scalable React Applications
          </h2>
          <p className="text-gray-600">
            In this comprehensive guide, we'll explore the best practices for building scalable React applications 
            that can grow with your team and user base. From component architecture to state management, 
            we'll cover everything you need to know.
          </p>
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
            <span>By Sarah Developer</span>
            <span>•</span>
            <span>2 hours ago</span>
            <span>•</span>
            <span>1.2k views</span>
          </div>
        </div>
        
        <CommentSection
          postId="demo-post-1"
          postType="post"
          isCollapsible={true}
        />
      </div>

      {/* Video Comment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            🎥 React Hooks Tutorial - Complete Guide
          </h2>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
              </div>
              <p className="text-sm">Video Tutorial - 45:32</p>
            </div>
          </div>
          <p className="text-gray-600">
            Learn React Hooks from scratch with practical examples and real-world use cases.
          </p>
        </div>
        
        <CommentSection
          postId="demo-video-1"
          postType="video"
          isCollapsible={true}
        />
      </div>

      {/* Q&A Comment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Question
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                What's the best way to handle authentication in React apps?
              </h2>
              <p className="text-gray-600 mb-4">
                I'm building a React application and need to implement user authentication. 
                I've heard about JWT tokens, OAuth, and various libraries like Auth0. 
                What would you recommend for a medium-sized application?
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Asked by Mike Developer</span>
                <span>•</span>
                <span>1 day ago</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <span>⭐ 15 stars</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CommentSection
          postId="demo-qa-1"
          postType="qa"
          isCollapsible={false}
          maxHeight="max-h-[500px]"
        />
      </div>

      {/* Features Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comment System Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Anonymous & Public commenting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Star useful comments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Nested replies (3 levels deep)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">File attachments support</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Emoji picker integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Moderation & flagging system</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Sort by newest, oldest, popular</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Mobile-first responsive design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}