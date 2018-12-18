import socketIOClient from 'socket.io-client';
import { ajax } from 'rxjs/ajax';
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
    const options = apiService(data, method);
    const request$ = ajax({
      url: `${process.env.URL}books${url}`,
      ...options,
    });
    request$.subscribe(
      (res) => {
        const { response } = res;
        if (method === 'PATCH') {
          const socket = socketIOClient(process.env.URL);
          socket.emit('lend message', response.message);
        }
        return dispatch({ type: SUCCESS_FETCH_BOOKS, payload: response });
      },
      (err) => {
        if (err.status === 403) {
          return dispatch({ type: FORBIDDEN_BOOKS });
        }
        if (err.status === 404) {
          return dispatch({ type: NOT_FOUND });
        }
        return dispatch({ type: FAIL_FETCH_BOOKS, payload: err })
      },
    );
  });
}

export const changeUrl = url => ({
  type: CHANGE_URL,
  payload: url,
});
