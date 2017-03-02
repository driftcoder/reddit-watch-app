import _ from 'lodash';

import {SET_ERROR} from 'actions/error.js';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;
    default:
      return state;
  }
};
