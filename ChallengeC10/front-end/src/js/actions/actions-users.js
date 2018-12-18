import { ajax } from 'rxjs/ajax';
import apiService from '../services/api-service';

import {
  LOG_IN_REQUEST,
  LOG_IN_FAIL,
  LOG_IN_SUCCESSFUL,
  CHECK_INITIAL_TOKEN,
} from './actionTypes';

export function login(data) {
  return ((dispatch) => {
    dispatch({ type: LOG_IN_REQUEST });
    const options = apiService(data, 'POST');
    const request$ = ajax({
      url: `${process.env.URL}users/signIn`,
      ...options,
    });
    request$.subscribe(
      (res) => {
        const { response } = res;
        if (response.token) {
          sessionStorage.setItem('token', `Bearer ${response.token}`);
          return dispatch({ type: LOG_IN_SUCCESSFUL, payload: data.username });
        }
        return dispatch({ type: LOG_IN_FAIL, payload: 'An error ocurred while sending request' });
      },
      (err) => {
        const { message } = err.response;
        if (message) {
          return dispatch({ type: LOG_IN_FAIL, payload: message });
        }
        return dispatch({ type: LOG_IN_FAIL, payload: err.message });
      },
    );
  });
}

export const verifyToken = () => {
  let token = sessionStorage.getItem('token');
  let user = '';
  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    token = JSON.parse(window.atob(base64));
    const { username } = token.user;
    user = username;
  }
  return ({
    type: CHECK_INITIAL_TOKEN,
    payload: sessionStorage.getItem('token') ? { isLogged: true, user } : { isLogged: false },
  });
};
