export default function ChatOptions({ chatId, socket }) {
  const makePrivate = () => {
    const token = localStorage.getItem('token');
    socket.emit('makePrivate', { chatId, token });
  };

  const inviteUsers = () => {
    const token = localStorage.getItem('token');
    const invitedUser = prompt(
      'Enter the email of the user you want to invite'
    );
    socket.emit('inviteUsers', { chatId, token, invitedUser });
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
