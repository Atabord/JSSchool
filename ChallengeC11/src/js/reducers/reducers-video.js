import {
  VIDEO_PLAY,
  VIDEO_MOVE_TIME,
  VIDEO_MUTE,
  VIDEO_CHANGE_VOLUME,
  VIDEO_RUN_TIME,
  VIDEO_EXPAND,
} from '../actions/actionTypes';

const initialState = {
  paused: true,
  muted: false,
  volume: 1,
  videoSource: process.env.VIDEO_URL,
  expanded: false,
  currentTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_PLAY:
      return {
        ...state,
        paused: !state.paused,
      };
    case VIDEO_MOVE_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case VIDEO_MUTE:
      return {
        ...state,
        muted: !state.muted,
      };
    case VIDEO_CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case VIDEO_RUN_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case VIDEO_EXPAND:
      return {
        ...state,
        expanded: !state.expanded,
      };
    default:
      return state;
  }
};
