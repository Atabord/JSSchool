import { CLIP_ADD, CLIP_EDIT, CLIP_DELETE } from './actionTypes';

export function addClip(info) {
  return {
    type: CLIP_ADD,
    payload: info,
  };
}

export function editClip(info) {
  return {
    type: CLIP_EDIT,
    payload: info,
  };
}

export function deleteClip(clipList) {
  return {
    type: CLIP_DELETE,
    payload: clipList,
  };
}
