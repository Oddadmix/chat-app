import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export default function useSocketHook({ chatId }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('/', { query: { chatId } }));
  }, []);

  return socket;
}
