/**
 * Created by Lucian on 18/09/2016.
 */

import { API_ROOT } from '../../../server/config';
import { callApi } from '../../utils/api';
import {
  LOAD_COLLECTION_REQUEST,
  LOAD_COLLECTION_SUCCESS,
  LOAD_COLLECTION_FAILURE
} from '../../constants';


const collectionRequest = () => ({
    type: LOAD_COLLECTION_REQUEST
  });

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
const collectionSuccess = () =>
  payload => ({
      type: LOAD_COLLECTION_SUCCESS,
      collection: payload.results
    });

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
const collectionFailure = () =>
  error => ({
      type: LOAD_COLLECTION_FAILURE,
      error
  });

function fetchTopUsers(id) {
  const url = `${API_ROOT}/api/v1/scm/collections?page=${page}`;
  return callApi(url, null, usersRequest(page), usersSuccess(page), usersFailure(page));
}

export function loadCollection (id) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_COLLECTION_REQUEST });
    return axios.get(`${protocol}://${host}/api/v1/scm//${id}`)
      .then(res => {
        dispatch({
          type: LOAD_COLLECTION_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_COLLECTION_SUCCESS}: `, error);
        dispatch({
          type: LOAD_COLLECTION_FAILURE,
          payload: error,
          error: true
        });
      })
  }
}
