import { useEffect, useState } from 'react';

export default function useUsernameHook() {
  const [sender, setSender] = useState('Test');

  useEffect(() => {
    //Check in localStroage
    const senderName = localStorage.getItem('senderName');

    if (senderName) {
      setSender(senderName);
    } else {
      const senderInput = prompt('Please enter your name:', 'User');
      setSender(senderInput);
      localStorage.setItem('senderName', senderInput);
    }
  }, []);

  return sender;
}
