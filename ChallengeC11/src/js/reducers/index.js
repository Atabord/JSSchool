import { combineReducers } from 'redux';
import VideoReducer from './reducers-video';

const allReducers = combineReducers({
  video: VideoReducer,
});

export default allReducers;
