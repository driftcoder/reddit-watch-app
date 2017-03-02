import _ from 'lodash';

import {
  SHOW_IMAGES,
  USE_BIG_IMAGES,
  SET_AUTOSCROLL,
} from 'actions/preferences.js';

const initialState = {
  showImages: true,
  bigImages: true,
  autoscroll: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMAGES:
      return _.merge({}, state, {showImages: action.show});
    case USE_BIG_IMAGES:
      return _.merge({}, state, {bigImages: action.big});
    case SET_AUTOSCROLL:
      return _.merge({}, state, {autoscroll: action.autoscroll});
    default:
      return state;
  }
};
