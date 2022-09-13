import logo from './logo.svg';
import './output.css';
import Chat from './Organism/ChatColumn';
import Lobby from './Organism/Lobby';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import React, {Component, useState} from 'react';
import Counter from './Organism/Counter';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const joinRoom = async (user)=>{
    try{
      
      const connection = new HubConnectionBuilder()
                              .withUrl("https://localhost:7259/chat")
                              .configureLogging(LogLevel.Information)
                              .build();
      connection.on("ReceiveMessage",(user,message)=>{
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
      await connection.invoke("JoinRoom", {user});
      setConnection(connection);

    } catch (e){
      console.log(e);
    }
  }
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
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
