/**
 * Created by Lucian on 18/09/2016.
 */

// import { API_ROOT } from '../../../server/config';
// import { callApi } from '../../utils/api';
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
const collectionSuccess = payload => {
  return ({
    type: LOAD_COLLECTION_SUCCESS,
    collection: payload.data,
    meta: Object.assign({}, payload.data.metadata, {
      lastFetched: Date.now()
    })
  });
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
const collectionFailure = () =>
  error => ({
      type: LOAD_COLLECTION_FAILURE,
      error
  });

function fetchTopUsers(id) {
  const url = `${API_ROOT}/api/v0/collections?page=${page}`;
  return callApi(url, null, usersRequest(page), usersSuccess(page), usersFailure(page));
}

export function loadCollection (id) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_COLLECTION_REQUEST });

    axios.get(`${protocol}://${host}/api/v0/collections/${id}`)
      .then(payload => {
        dispatch(collectionSuccess(payload))
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_COLLECTION_SUCCESS}: `, error);
        const response = error.response;
        if (response === undefined) {
          dispatch(collectionFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then((text) => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(collectionFailure(error));
          });
        }
      })
  }
}
