import { useEffect, useState } from 'react';

export default function useChatsOwnerHook({ socket }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (socket != null) {
      const token = localStorage.getItem('token');
      socket.on('getChats', (chats) => {
        setChats(chats);
      });
      socket.emit('getChats', { token });
    }
  }, [socket]);

  return chats;
}
