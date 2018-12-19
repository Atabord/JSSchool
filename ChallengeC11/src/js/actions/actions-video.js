import { VIDEO_PLAY, VIDEO_MOVE_TIME } from './actionTypes';

export function playVideo() {
  return {
    type: VIDEO_PLAY,
  };
}

export function moveTime(time) {
  return {
    type: VIDEO_MOVE_TIME,
    payload: time,
  };
}
