import { useState } from 'react';

export default function useChatIdHook() {
  const urlParams = new URLSearchParams(window.location.search);
  const [chatId, setChatId] = useState(urlParams.get('chatId'));

  return chatId;
}
