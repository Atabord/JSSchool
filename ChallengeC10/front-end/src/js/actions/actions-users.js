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
    return fetch(`${process.env.URL}users/signIn`, apiService(data, 'POST'))
      .then(res => res.json())
      .then((result) => {
        if (result.token) {
          sessionStorage.setItem('token', `Bearer ${result.token}`);
          return dispatch({ type: LOG_IN_SUCCESSFUL, payload: data.username });
        }
        return dispatch({ type: LOG_IN_FAIL, payload: result.message });
      },
      err => dispatch({ type: LOG_IN_FAIL, payload: err }))
      .catch(err => dispatch({ type: LOG_IN_FAIL, payload: err }));
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
