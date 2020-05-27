import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import SoundBoard from '../../components/SoundBoard';
import socketIOClient from 'socket.io-client';
import {
  useParams,
  Link,
} from 'react-router-dom';
import Notifications from '../../components/Notifications';
import { toggleNotification } from '../../actions';
import { playSound } from '../../helpers';

const App = ({
  toggleNotification,
}) => {
  const { id } = useParams();
  const [socket, setSocket] = useState('');
  useEffect(() => {
    const s = socketIOClient();
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error('there was a problem copying the board link', err);
    }
  };
  return (
    <main className="app">
      <Notifications />
      <div className="container">
        <h1 className="display">GOTEM</h1>
        <p>share the board with your friends</p>
        <button onClick={copyLink} className="button">copy room link</button>
        <p><Link to="/">return to lobby</Link></p>
        <SoundBoard socket={socket} />
      </div>
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleNotification: text => dispatch(toggleNotification(text)),
});

export default connect(null, mapDispatchToProps)(App);
