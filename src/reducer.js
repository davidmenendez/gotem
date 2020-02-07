import { combineReducers } from 'redux'

import {
  REQUEST_SOUNDS,
  RECIEVE_SOUNDS,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './actions';

const sounds = (
  state = {
    isFetching: false,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_SOUNDS:
      return {
        ...state,
        isFetching: true,
      }
    case RECIEVE_SOUNDS:
      return {
        ...state,
        isFetching: false,
        items: action.payload,
      }
    default:
      return state;
  }
};

const notifications = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        },
      ];
    case REMOVE_NOTIFICATION:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export default combineReducers({ sounds, notifications });
