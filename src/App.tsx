import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/home/HomePage'
import ProfilePage from './pages/profile/ProfilePage'
import ChatPage from './pages/chat/ChatPage'
import GroupsPage from './pages/groups/GroupsPage'
import QAPage from './pages/qa/QAPage'
import ExplorePage from './pages/explore/ExplorePage'
import LoginPage from './pages/auth/LoginPage'
import MorePage from './pages/more/MorePage'
import SettingsPage from './pages/more/SettingsPage'
import AboutPage from './pages/more/AboutPage'
import HelpPage from './pages/more/HelpPage'
import CommentsDemo from './pages/CommentsDemo'
import FloatingChatbot from './components/features/ai-assistant/FloatingChatbot'
import DeviceConflictAlert from './components/features/security/DeviceConflictAlert'
import ToastNotification from './components/features/security/ToastNotification'
import { useSecurityManager } from './hooks/useSecurityManager'
import { useAuthStore } from './store/authStore'
import './index.css'

function App() {
  const { securityState, handleDeviceConflictClose, handleForceLogout, handleToastClose } = useSecurityManager()
  const { isAuthenticated } = useAuthStore()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/*" element={
          isAuthenticated ? (
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:userId?" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/qa" element={<QAPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/more" element={<MorePage />} />
                <Route path="/more/settings" element={<SettingsPage />} />
                <Route path="/more/about" element={<AboutPage />} />
                <Route path="/more/help" element={<HelpPage />} />
                <Route path="/comments" element={<CommentsDemo />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
      
      {/* Global Components - Only show when authenticated */}
      {isAuthenticated && (
        <>
          <FloatingChatbot />
          <DeviceConflictAlert
            isVisible={securityState.showDeviceConflict}
            onClose={handleDeviceConflictClose}
            onLogout={handleForceLogout}
          />
          <ToastNotification
            message="You have been logged out due to device conflict"
            type="warning"
            isVisible={securityState.showLogoutToast}
            onClose={handleToastClose}
          />
        </>
      )}
    </BrowserRouter>
  )
}

export default App