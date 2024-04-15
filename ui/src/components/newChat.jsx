import { v4 as uuidv4 } from 'uuid';

export default function NewChat(){

    const generateNewChatId = ()=>{
        const newChatId = uuidv4();
        window.location.href = `/?chatId=${newChatId}`;
    }
    return  <button onClick={generateNewChatId}>New Chat</button>;
}