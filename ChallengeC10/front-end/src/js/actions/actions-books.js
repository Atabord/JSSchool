import socketIOClient from 'socket.io-client';
import apiService from '../services/api-service';

import {
  FORBIDDEN_BOOKS,
  NOT_FOUND,
  SUCCESS_FETCH_BOOKS,
  FAIL_FETCH_BOOKS,
  REQUEST_BOOKS,
  CHANGE_URL,
} from './actionTypes';

export function searchBook(url, method = 'GET', data) {
  return ((dispatch) => {
    dispatch({ type: REQUEST_BOOKS });
    return fetch(`${process.env.URL}books${url}`, apiService(data, method))
      .then((res) => {
        if (res.status === 403) {
          return dispatch({ type: FORBIDDEN_BOOKS });
        }
        if (res.status === 404) {
          return dispatch({ type: NOT_FOUND });
        }
        return res.json();
      })
      .then((result) => {
        if (method === 'PATCH') {
          const socket = socketIOClient(process.env.URL);
          socket.emit('lend message', result.message);
        }
        return dispatch({ type: SUCCESS_FETCH_BOOKS, payload: result });
      },
      err => dispatch({ type: FAIL_FETCH_BOOKS, payload: err }))
      .catch(err => dispatch({ type: FAIL_FETCH_BOOKS, payload: err }));
  });
}

export const changeUrl = url => ({
  type: CHANGE_URL,
  payload: url,
});
