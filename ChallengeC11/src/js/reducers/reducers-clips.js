import { CLIP_ADD, CLIP_EDIT } from '../actions/actionTypes';

/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */

export default (state = {}, action) => {
  switch (action.type) {
    case CLIP_ADD:
      return {
        ...state,
        ...action.payload,
      };
    case CLIP_EDIT:
      return state.map(clip => (
        (clip.id === action.id)
          ? { ...clip, ...action.payload }
          : clip
      ));
    default:
      return state;
  }
};
