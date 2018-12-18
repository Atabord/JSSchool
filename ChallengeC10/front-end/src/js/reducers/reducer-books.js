import {
  SUCCESS_FETCH_BOOKS,
  FAIL_FETCH_BOOKS,
  REQUEST_BOOKS,
  NOT_FOUND,
  CHANGE_URL,
} from '../actions/actionTypes';

const initialState = {
  error: null,
  isLoaded: false,
  books: [],
  pagination: {},
  book: {},
  message: '',
  notFound: false,
  url: '/',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {
        ...state,
        isLoaded: false,
        books: [],
        message: '',
        pagination: {},
        notFound: false,
      };
    case SUCCESS_FETCH_BOOKS:
      return {
        ...state,
        ...action.payload,
        notFound: false,
        isLoaded: true,
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
        notFound: false,
        url: action.payload,
      };
    case NOT_FOUND:
      return {
        ...state,
        notFound: true,
      };
    default:
      return state;
  }
};
