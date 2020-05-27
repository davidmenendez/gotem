import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import Page from '../../components/Page';

const Home = () => {
  const history = useHistory();
  const [room, setRoom] = useState('');
  const onChangeHandler = e => {
    setRoom(e.target.value);
  };
  const joinRoom = e => {
    e.preventDefault();
    const fixedRoom = room.toLocaleLowerCase();
    history.push(`/room/${fixedRoom || v4()}`);
  };
  return (
    <Page className="landing">
      <div className="login">
        <h1 className="display">GOTEM</h1>
        <h2>The shared soundboard</h2>
        <h3>Join a room</h3>
        <p>You can use your own name or a random name will be used</p>
        <div className="room-input">
          <form onSubmit={joinRoom}>
            <input type="text" value={room} onChange={onChangeHandler} placeholder="room name" />
            <button className="button button--block">join</button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default Home;
