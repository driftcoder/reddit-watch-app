export const HIDE_IMAGES = 'HIDE_IMAGES';
export const SHOW_IMAGES = 'SHOW_IMAGES';
export const SHOW_BIG_IMAGES = 'SHOW_BIG_IMAGES';

export function hideImages() {
  return {type: HIDE_IMAGES};
}

export function showImages() {
  return {type: SHOW_IMAGES};
}

export function showBigImages() {
  return {type: SHOW_BIG_IMAGES};
}
