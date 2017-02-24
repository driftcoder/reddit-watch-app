import {combineReducers} from 'redux';

import reddit from 'reducers/reddit.js';

export default function getReducers() {
  return combineReducers({
    reddit,
  });
}
