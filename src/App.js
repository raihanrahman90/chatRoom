import logo from './logo.svg';
import './output.css';
import Chat from './Organism/ChatColumn';
import Lobby from './Organism/Lobby';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import React, {Component, useState} from 'react';
import Counter from './Organism/Counter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setUsername } from './Redux/Function/UsernameSlicer';
function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessage] = useState([]);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const joinRoom = async (username)=>{
    try{
      
      const connection = new HubConnectionBuilder()
                              .withUrl("https://localhost:7259/chat")
                              .configureLogging(LogLevel.Information)
                              .build();
      connection.on("ReceiveMessage",(user,message)=>{
        console.log("ini isi dari user");
        console.log(user);
        console.log("ini isi dari message");
        console.log(message);
        setMessage(messages=>[...messages, {user, message}]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessage([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {username});
      setConnection(connection);
      setUsername(username);
    } catch (e){
      console.log(e);
    }
  }
  const sendMessage = async (to,message) => {
    var from = username;
    var body = message;
    try {
      await connection.invoke("SendMessage", {from, to, body});
    } catch (e) {
      console.log(e);
    }
  }
  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 class="text-3xl font-bold underline text-sky-800">
          test
        </h1>
        {!connection
        ?<Lobby joinRoom={joinRoom} />
        :<Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />
        }
        
      </header>
      {/* example redux <Counter/> */}
    </div>
  );
}

export default App;
