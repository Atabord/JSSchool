import {
  VIDEO_PLAY,
  VIDEO_MUTE,
  VIDEO_MOVE_TIME,
  VIDEO_CHANGE_VOLUME,
  VIDEO_RUN_TIME,
  VIDEO_EXPAND,
} from './actionTypes';

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

export function muteVideo() {
  return {
    type: VIDEO_MUTE,
  };
}

export function changeVolume(volume) {
  return {
    type: VIDEO_CHANGE_VOLUME,
    payload: volume,
  };
}

export function showTimeRunning(time) {
  return {
    type: VIDEO_RUN_TIME,
    payload: time,
  };
}

export function expandVideo() {
  return {
    type: VIDEO_EXPAND,
  };
}
