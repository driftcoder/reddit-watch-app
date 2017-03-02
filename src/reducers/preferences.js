import _ from 'lodash';

import {
  SHOW_IMAGES,
  SHOW_BIG_IMAGES,
  HIDE_IMAGES,
  SET_AUTOSCROLL,
} from 'actions/preferences.js';

const initialState = {
  showImages: true,
  showBigImages: true,
  autoscroll: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMAGES:
      return _.merge({}, state, {
        showImages: true,
        showBigImages: false,
      });
    case SHOW_BIG_IMAGES:
      return _.merge({}, state, {
        showImages: true,
        showBigImages: true,
      });
    case HIDE_IMAGES:
      return _.merge({}, state, {
        showImages: false,
        showBigImages: false,
      });
    case SET_AUTOSCROLL:
      return _.merge({}, state, {autoscroll: action.autoscroll});
    default:
      return state;
  }
};
