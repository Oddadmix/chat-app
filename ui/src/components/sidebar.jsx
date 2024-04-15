import { useEffect, useState } from 'react';
import NewChat from './newChat';
import useChatsOwnerHook from '../hooks/chatsOwnerHook';

export default function Sidebar({ socket }) {
  const chats = useChatsOwnerHook({ socket });

  return (
    <div className='w-1/4 bg-white border-r border-gray-300'>
      <header className='p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white'>
        <h1 className='text-2xl font-semibold'>Chat Web</h1>
        <NewChat />
        <div className='relative'>
          <button
            id='menuButton'
            className='focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-100'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
              <path d='M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z' />
            </svg>
          </button>

          <div
            id='menuDropdown'
            className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden'
          >
            <ul className='py-2 px-3'>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 text-gray-800 hover:text-gray-400'
                >
                  Option 1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 text-gray-800 hover:text-gray-400'
                >
                  Option 2
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* <!-- Contact List --> */}
      <div className='overflow-y-auto h-screen p-3 mb-9 pb-20'>
        {chats.map((chat) => {
          return (
            <div
              key={chat.name}
              className='flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md'
            >
              <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                <img
                  src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
                  alt='User Avatar'
                  className='w-12 h-12 rounded-full'
                />
              </div>
              <div className='flex-1'>
                <a href={`/?chatId=${chat.name}`}>
                  <h2 className='text-lg font-semibold'>
                    {chat.name || 'General'}
                  </h2>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
