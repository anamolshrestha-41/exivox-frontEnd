import { useEffect } from 'react'
import { socketService } from '@services/socket/socketService'
import { useAuthStore } from '@store/authStore'
import { useChatStore } from '@store/chatStore'

export function useSocket() {
  const { user } = useAuthStore()
  const { addMessage } = useChatStore()

  useEffect(() => {
    if (user) {
      socketService.connect(user.id)

      socketService.onMessage((message) => {
        addMessage(message.chatId, message)
      })

      return () => {
        socketService.disconnect()
      }
    }
  }, [user, addMessage])

  return {
    joinRoom: socketService.joinRoom.bind(socketService),
    leaveRoom: socketService.leaveRoom.bind(socketService),
    sendMessage: socketService.sendMessage.bind(socketService),
  }
}