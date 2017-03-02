import {combineReducers} from 'redux';

import preferences from 'reducers/preferences.js';
import reddit from 'reducers/reddit.js';

export default function getReducers() {
  return combineReducers({
    preferences,
    reddit,
  });
}
