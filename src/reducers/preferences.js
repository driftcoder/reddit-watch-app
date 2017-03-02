import _ from 'lodash';

import {SHOW_IMAGES, SHOW_BIG_IMAGES, HIDE_IMAGES} from 'actions/preferences.js';

const initialState = {
  showImages: true,
  showBigImages: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMAGES:
      return {
        showImages: true,
        showBigImages: false,
      };
    case SHOW_BIG_IMAGES:
      return {
        showImages: true,
        showBigImages: true,
      };
    case HIDE_IMAGES:
      return {
        showImages: false,
        showBigImages: false,
      };
    default:
      return state;
  }
};
