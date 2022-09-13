import { useEffect, useRef } from 'react';
import React from 'react';

const MessageContainer = ({ messages, username }) => {
    const messageRef = useRef();

    useEffect(() => {
        console.log("isi dari message");
        console.log(messages);
        console.log("isi dari username");
        console.log(username);
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={messageRef} className='message-container' >
        {messages.map((m, index) =>
           
            <div key={index} className={'user-message '+ (m.user == username? 'float-left bg-yellow-100':'float-right bg-green-100')}> 
                {m.user == username?"ini dari pengirim":"bukan dari pengirim, tpi dari"+m.user}
                <div className='message'>{m.message}</div>
                <div className='from-user'>{m.user}</div>
            </div>
        )}
    </div>
}

export default MessageContainer;
