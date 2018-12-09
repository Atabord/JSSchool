import {
  FORBIDDEN_BOOKS,
  NOT_FOUND,
  SUCCESS_FETCH_BOOKS,
  FAIL_FETCH_BOOKS,
  REQUEST_BOOKS,
} from '../actions/actionTypes';

const initialState = {
  error: null,
  isLoaded: false,
  books: [],
  pagination: {},
  url: '/',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {
        ...state,
        isLoaded: false,
        books: [],
        pagination: {},
      };
    case SUCCESS_FETCH_BOOKS:
      return {
        ...state,
        isLoaded: true,
        books: action.payload,
      };
    case FAIL_FETCH_BOOKS:
      return {
        ...state,
        isLoaded: true,
        error: action.payload,
      };
    default:
      return state;
  }
};