import { VIDEO_PLAY, VIDEO_MOVE_TIME, VIDEO_MUTE, VIDEO_CHANGE_VOLUME } from '../actions/actionTypes';

const initialState = {
  paused: true,
  muted: false,
  volume: 1,
  expanded: null,
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
    default:
      return state;
  }
};
