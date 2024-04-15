import { useEffect, useState } from 'react';
import './App.css';
import useUsernameHook from './hooks/usernameHook';
import SendMessage from './components/sendMessage';
import Messages from './components/messages';
import useSocketHook from './hooks/socketHook';
import useChatIdHook from './hooks/chatIdHook';
import useAuthHook from './hooks/authHook';
import Login from './components/login';
import Sidebar from './components/sidebar';
import ChatOptions from './components/chatOptions';
import useMessagesHook from './hooks/messagesHook';
import Modal from './components/common/modal';
import useAppStore from './stores/appStore';

function App() {
  const [messages, setMessages] = useState([]);
  const sender = useUsernameHook();
  const chatId = useChatIdHook();
  const socket = useSocketHook({ chatId });
  useMessagesHook({ chatId, socket, setMessages });

  const { modal, setModal } = useAppStore();

  const { isLoggedIn } = useAuthHook({ socket });

  useEffect(() => {
    if (socket != null) {
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [socket, messages, setMessages]);

  return (
    <>
      {isLoggedIn && (
        <div className='flex h-screen overflow-hidden'>
          <Sidebar socket={socket} />

          <div className='flex-1'>
            <header className='bg-white p-4 text-gray-700'>
              <h1 className='text-2xl font-semibold'>
                {chatId}
                <ChatOptions
                  chatId={chatId}
                  socket={socket}
                />
              </h1>
            </header>

            <Messages messages={messages} />

            <SendMessage
              chatId={chatId}
              socket={socket}
              sender={sender}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      )}

      {!isLoggedIn && <Login socket={socket} />}

      <Modal
        onClick={modal.onClick}
        show={modal.show}
      >
        {modal.children}
      </Modal>
    </>
  );
}

export default App;
