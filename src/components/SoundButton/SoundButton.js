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
  return <button className="soundbutton" onClick={clickHandler}>{children}</button>
};

SoundButton.propTypes = {
  children: PropTypes.node,
};

SoundButton.defaultProps = {
  children: '',
};

export default SoundButton;
