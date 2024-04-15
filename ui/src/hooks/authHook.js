import { useEffect, useState } from 'react';

export default function useAuthHook({ socket }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!socket) return;

    socket.on('otpSuccess', (data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      setToken(data.token);
    });
  }, [socket]);

  return {
    isLoggedIn: token ? true : false,
  };
}
