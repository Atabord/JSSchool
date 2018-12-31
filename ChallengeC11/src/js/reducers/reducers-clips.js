import { CLIP_ADD, CLIP_EDIT, CLIP_DELETE } from '../actions/actionTypes';

/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */

const clips = JSON.parse(localStorage.getItem('videoClips'));

const defaultClips = [
  {
    clipName: 'Poor Dragon',
    startTime: '26',
    endTime: '34',
    tags: ['Sad', 'Dragon'],
  },
];

// if there is any clip on localStorage, add it to initialState
const initialState = clips
  ? defaultClips.concat(clips)
  : defaultClips;

export default (state = initialState || [], action) => {
  switch (action.type) {
    case CLIP_ADD:
      return [
        ...state,
        { ...action.payload },
      ];
    case CLIP_EDIT:
      return state.map(clip => (
        clip.clipName === action.payload.oldName
          ? { ...action.payload.clip }
          : clip
      ));
    case CLIP_DELETE:
      return action.payload;
    default:
      return state;
  }
};
