import { ArrowLeft, Users, Target, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Link to="/more" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About Us</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Learn about Exivox</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Exivox</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              A modern social learning platform that brings together the best of social media and education.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To create an engaging platform where learning meets social interaction, making education accessible and enjoyable for everyone.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of community-driven learning, where users share knowledge, ask questions, and grow together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Built with Love</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Crafted with modern technologies and designed with user experience in mind, Exivox is built to inspire and educate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Version 1.0.0</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with React.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}