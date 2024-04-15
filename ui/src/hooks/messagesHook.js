import { useEffect } from 'react';

export default function useMessagesHook({ chatId, socket, setMessages }) {
  useEffect(() => {
    if (socket != null) {
      socket.on('getMessages', (messages) => {
        setMessages(messages);
      });
      const token = localStorage.getItem('token');
      socket.emit('getMessages', { chatId, token });
    }
  }, [socket]);
}
