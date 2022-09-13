import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';
const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const [to, setTo] = useState('');
    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(to,message);
            setMessage('');
        }}>
        <InputGroup>
            <FormControl type="user" placeholder="Send To"
                onChange={e => setTo(e.target.value)} value={to} />
            <FormControl type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message} />
                <Button variant="primary" type="submit" disabled={!to}>Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;
