import {combineReducers} from 'redux';

import error from 'reducers/error.js';
import preferences from 'reducers/preferences.js';
import reddit from 'reducers/reddit.js';

export default function getReducers() {
  return combineReducers({
    error,
    preferences,
    reddit,
  });
}
