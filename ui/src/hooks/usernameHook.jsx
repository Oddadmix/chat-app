import { useEffect, useState } from 'react';
import useAppStore from '../stores/appStore';

export default function useUsernameHook() {
  const [sender, setSender] = useState('Test');

  const { setModal } = useAppStore();

  useEffect(() => {
    //Check in localStroage
    const senderName = localStorage.getItem('senderName');

    if (senderName) {
      setSender(senderName);
    } else {
      // const senderInput = prompt('Please enter your name:', 'User');

      setModal({
        show: true,
        children: (
          <>
            <label
              for='first_name'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Please enter your name:
            </label>
            <input
              type='text'
              id='senderName'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='John'
              required
            />
          </>
        ),
        onClick: () => {
          const senderInput = document.getElementById('senderName').value;
          setSender(senderInput);
          localStorage.setItem('senderName', senderInput);
          setModal({
            show: false,
          });
        },
      });
    }
  }, []);

  return sender;
}
