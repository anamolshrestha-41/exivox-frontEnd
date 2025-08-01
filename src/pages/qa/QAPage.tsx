export default function QAPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Questions & Answers</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Ask Question
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How to implement state management in React?
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Asked by john_doe</span>
              <span>2 hours ago</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">State Management</span>
            </div>
            <div className="flex items-center space-x-6 mt-3">
              <span className="text-sm text-gray-600">5 votes</span>
              <span className="text-sm text-gray-600">3 answers</span>
              <span className="text-sm text-green-600">✓ Answered</span>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Best practices for API integration in modern web apps?
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Asked by jane_smith</span>
              <span>5 hours ago</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">API</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Best Practices</span>
            </div>
            <div className="flex items-center space-x-6 mt-3">
              <span className="text-sm text-gray-600">12 votes</span>
              <span className="text-sm text-gray-600">7 answers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}