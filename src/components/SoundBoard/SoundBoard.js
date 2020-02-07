import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SoundBoard.css';
import {
  fetchSounds,
} from '../../actions';
import SoundButton from '../SoundButton';
import {
  playSound,
} from '../../helpers';

const SoundBoard = ({
  sounds,
  socket,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchSounds();
  }, []);
  const emitSound = sound => {
    socket.emit('soundRequest', { sound, id });
    playSound(sound);
  };
  if (sounds.isFetching) return <p>loading</p>;
  return (
    <section className="soundboard">
      {sounds.items.map(sound => <SoundButton key={sound} onClick={emitSound}>{sound}</SoundButton>)}
    </section>
  );
}

SoundBoard.propTypes = {
  sounds: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sounds: state.sounds,
});
const mapDispatchToProps = dispatch => ({
  fetchSounds: dispatch(fetchSounds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundBoard);
