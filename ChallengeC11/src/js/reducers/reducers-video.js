import {
  VIDEO_PLAY,
  VIDEO_MOVE_TIME,
  VIDEO_MUTE,
  VIDEO_CHANGE_VOLUME,
  VIDEO_RUN_TIME,
  VIDEO_EXPAND,
  VIDEO_PLAY_CLIP,
} from '../actions/actionTypes';

const URL = process.env.VIDEO_URL;

const initialState = {
  paused: true,
  muted: false,
  volume: 1,
  videoSource: URL,
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
    case VIDEO_PLAY_CLIP:
      return {
        ...state,
        videoSource: `${URL}#t=${action.payload.startTime},${action.payload.endTime}`,
      };
    default:
      return state;
  }
};
