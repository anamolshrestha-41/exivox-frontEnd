import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GroupsList from '@components/features/groups/GroupsList'
import GroupChat from '@components/features/groups/GroupChat'
import CreateGroupModal from '@components/features/groups/CreateGroupModal'

export default function GroupsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <Routes>
        <Route 
          path="/" 
          element={
            <GroupsList 
              onCreateGroup={() => setShowCreateModal(true)}
            />
          } 
        />
        <Route path="/:groupId" element={<GroupChat />} />
      </Routes>
      
      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreateGroup={(group) => {
            console.log('Created group:', group)
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}