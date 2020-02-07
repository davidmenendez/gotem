import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import { v4 } from 'uuid';

const Home = () => {
  const history = useHistory();
  const [room, setRoom] = useState('');
  const onChangeHandler = e => {
    setRoom(e.target.value);
  };
  const joinRoom = e => {
    e.preventDefault();
    history.push(`/room/${room || v4()}`);
  };
  return (
    <section className="home">
      <div className="container">
        <h1 className="display">GOTEM</h1>
        <h2>The shared soundboard</h2>
        <h3>Join a room</h3>
        <p>You can use your own name or a random name will be used</p>
        <div className="room-input">
          <form onSubmit={joinRoom}>
            <input type="text" value={room} onChange={onChangeHandler} placeholder="room name" />
            <button className="button">join</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
