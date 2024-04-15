import useAppStore from '../stores/appStore';

export default function ChatOptions({ chatId, socket }) {
  const { setModal } = useAppStore();

  const makePrivate = () => {
    const token = localStorage.getItem('token');
    socket.emit('makePrivate', { chatId, token });
  };

  const inviteUsers = () => {
    const token = localStorage.getItem('token');

    setModal({
      show: true,
      children: (
        <>
          <label
            for='first_name'
            class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Enter the email of the user you want to invite
          </label>
          <input
            type='text'
            id='invitedEmail'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
          />
        </>
      ),
      onClick: () => {
        const invitedUser = document.getElementById('invitedEmail').value;
        socket.emit('inviteUsers', { chatId, token, invitedUser });
        setModal({
          show: false,
        });
      },
    });
  };

  return (
    <>
      <button
        onClick={makePrivate}
        className='bg-indigo-600 text-sm text-white px-3 ml-3 rounded-md'
      >
        Make Private
      </button>

      <button
        onClick={inviteUsers}
        className='bg-indigo-900 text-sm text-white px-3 ml-3 rounded-md'
      >
        Invite Users
      </button>
    </>
  );
}
