import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESSFUL,
  LOG_IN_FAIL,
  CHECK_INITIAL_TOKEN,
} from '../actions/actionTypes';

const initialState = {
  isLogged: false,
  loginLoading: false,
  loginError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_INITIAL_TOKEN:
      return {
        ...state,
        isLogged: action.payload.isLogged,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case LOG_IN_SUCCESSFUL:
      return {
        ...state,
        isLogged: true,
        loginError: null,
        loginLoading: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        isLogged: false,
        loginError: action.payload,
        loginLoading: false,
      };
    default:
      return state;
  }
};
