import apiService from '../services/api-service';
import {
  FORBIDDEN_BOOKS,
  NOT_FOUND,
  SUCCESS_FETCH_BOOKS,
  FAIL_FETCH_BOOKS,
  REQUEST_BOOKS,
} from './actionTypes';

export default function searchBook(url, data, method = 'GET') {
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
      .then(result => dispatch({ type: SUCCESS_FETCH_BOOKS, payload: result }),
        err => dispatch({ type: FAIL_FETCH_BOOKS, payload: err }))
      .catch(err => dispatch({ type: FAIL_FETCH_BOOKS, payload: err }));
  });
}
