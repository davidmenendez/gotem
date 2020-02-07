import { v4 } from 'uuid';

export const REQUEST_SOUNDS = 'REQUEST_SOUNDS';
export const RECIEVE_SOUNDS = 'RECIEVE_SOUNDS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function requestSounds() {
  return {
    type: REQUEST_SOUNDS,
  };
}

export function receiveSounds(payload) {
  return {
    type: RECIEVE_SOUNDS,
    payload,
  };
}

export function addNotification(id, text) {
  return {
    type: ADD_NOTIFICATION,
    id,
    text,
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id,
  };
}

export function fetchSounds() {
  return async dispatch => {
    try {
      dispatch(requestSounds());
      const res = await fetch('/api/sounds');
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      dispatch(receiveSounds(json));
      return json;
    } catch (err) {
      console.error('request failed', err);
    }
  }
}

export function toggleNotification(text) {
  return dispatch => {
    const notificationId = v4();
    dispatch(addNotification(notificationId, text));
    setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, 2000);
  }
}
