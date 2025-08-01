import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null

  connect(userId: string) {
    if (this.socket?.connected) return

    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: { userId },
      transports: ['websocket']
    })

    this.socket.on('connect', () => {
      console.log('Connected to socket server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  joinRoom(roomId: string) {
    this.socket?.emit('join-room', roomId)
  }

  leaveRoom(roomId: string) {
    this.socket?.emit('leave-room', roomId)
  }

  sendMessage(roomId: string, message: any) {
    this.socket?.emit('send-message', { roomId, message })
  }

  onMessage(callback: (message: any) => void) {
    this.socket?.on('new-message', callback)
  }

  onUserOnline(callback: (userId: string) => void) {
    this.socket?.on('user-online', callback)
  }

  onUserOffline(callback: (userId: string) => void) {
    this.socket?.on('user-offline', callback)
  }
}

export const socketService = new SocketService()