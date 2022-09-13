import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUsername } from '../Redux/Function/UsernameSlicer';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    const dispatch = useDispatch()

    return <Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(user, room);
            dispatch(setUsername(user))
        }} >
        <Form.Group>
            <Form.Control placeholder="name" onChange={e => setUser(e.target.value)} />
            <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
    </Form>
}

export default Lobby;
