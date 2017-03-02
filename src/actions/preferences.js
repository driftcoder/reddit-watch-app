export const SHOW_IMAGES = 'SHOW_IMAGES';
export const USE_BIG_IMAGES = 'USE_BIG_IMAGES';
export const SET_AUTOSCROLL = 'SET_AUTOSCROLL';

export function setShowImages(show) {
  return {
    type: SHOW_IMAGES,
    show: !!show,
  };
}

export function setBigImages(big) {
  return {
    type: USE_BIG_IMAGES,
    big: !!big,
  };
}

export function setAutoscroll(autoscroll) {
  return {
    type: SET_AUTOSCROLL,
    autoscroll: !!autoscroll,
  };
}
