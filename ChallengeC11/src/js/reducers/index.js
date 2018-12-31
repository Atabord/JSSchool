import { combineReducers } from 'redux';
import VideoReducer from './reducers-video';
import ClipsReducer from './reducers-clips';

const allReducers = combineReducers({
  video: VideoReducer,
  clips: ClipsReducer,
});

export default allReducers;
