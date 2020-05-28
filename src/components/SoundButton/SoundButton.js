import React from 'react';
import PropTypes from 'prop-types';
import './SoundButton.css';

const SoundButton = ({
  children,
  onClick,
  loading,
}) => {
  const clickHandler = e => {
    e.preventDefault();
    onClick(children);
  };
  const getButtonClasses = () => {
    const classNames = [];
    if (loading) classNames.push('soundbutton-skeleton');
    else {
      const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      classNames.push('soundbutton', `soundbutton--${color}`);
    }
    return classNames.join(' ');
  };
  const classNames = getButtonClasses();
  return <button className={classNames} onClick={clickHandler}>{children}</button>
};

SoundButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

SoundButton.defaultProps = {
  children: '',
  onClick: () => {},
  loading: false,
};

export default SoundButton;
