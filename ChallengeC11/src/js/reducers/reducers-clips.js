import { CLIP_ADD, CLIP_EDIT, CLIP_DELETE } from '../actions/actionTypes';

/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */

export default (state = [], action) => {
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
      return state.filter(clip => clip.clipName !== action.payload);
    default:
      return state;
  }
};
