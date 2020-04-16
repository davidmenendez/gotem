import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import SoundBoard from '../SoundBoard';
import io from 'socket.io-client';
import {
  useParams,
  Link,
} from 'react-router-dom';
import Notifications from '../Notifications';
import { toggleNotification } from '../../actions';
import { playSound } from '../../helpers';

const App = ({
  toggleNotification,
}) => {
  const { id } = useParams();
  const [socket, setSocket] = useState('');
  useEffect(() => {
    const s = io();
    setSocket(s);
    s.emit('join', id);
    s.on('soundReceived', sound => {
      playSound(sound);
    });
    s.on('userJoined', () => {
      toggleNotification('user joined');
    });
    return function cleanup() {
      s.close();
    };
  }, [setSocket, id, toggleNotification]);
  return (
    <main className="app">
      <Notifications />
      <div className="container">
        <h1 className="display">GOTEM</h1>
        <Link to="/">{`leave ${id} and return to lobby`}</Link>
        <SoundBoard socket={socket} />
      </div>
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleNotification: text => dispatch(toggleNotification(text)),
});

export default connect(null, mapDispatchToProps)(App);
