import React from 'react';
import PropTypes from 'prop-types';
import './SoundButton.css';

const SoundButton = ({
  children,
  onClick,
}) => {
  const clickHandler = e => {
    e.preventDefault();
    onClick(children);
  };
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return <button className={`soundbutton soundbutton--${color}`} onClick={clickHandler}>{children}</button>
};

SoundButton.propTypes = {
  children: PropTypes.node,
};

SoundButton.defaultProps = {
  children: '',
};

export default SoundButton;
