import { combineReducers } from 'redux';
import UserReducer from './reducer-users';
import BookReducer from './reducer-books';

const allReducers = combineReducers({
  user: UserReducer,
  books: BookReducer,
});

export default allReducers;
