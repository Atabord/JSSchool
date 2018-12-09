import {
  FORBIDDEN_BOOKS,
  NOT_FOUND,
  SUCCESS_FETCH_BOOKS,
  FAIL_FETCH_BOOKS,
  REQUEST_BOOKS,
  CHANGE_URL,
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
        ...action.payload,
      };
    case FAIL_FETCH_BOOKS:
      return {
        ...state,
        isLoaded: true,
        error: action.payload,
      };
    case CHANGE_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};