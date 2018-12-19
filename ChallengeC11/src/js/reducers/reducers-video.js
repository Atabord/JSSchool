import { VIDEO_PLAY, VIDEO_MOVE_TIME } from '../actions/actionTypes';

const initialState = {
  paused: true,
  muted: false,
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
    default:
      return state;
  }
};
