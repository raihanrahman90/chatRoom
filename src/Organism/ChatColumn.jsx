import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUser';
import { Button } from 'react-bootstrap';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
const Chat = ({ sendMessage, messages, users, closeConnection }) => {
    const username = useSelector((state) => state.username.value)
    console.log(username)
    return (
    <div>
        <div className='leave-room'>
            <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
        </div>
        <ConnectedUsers users={users} />
        <div className='chat'>
            <MessageContainer messages={messages} username = {username}/>
            <SendMessageForm sendMessage={sendMessage} />
            
        </div>
    </div>);
}

export default Chat;
