/**
 * Created by Lucian on 16/09/2016.
 */


import API_ROOT from '../../../server/config';
import { checkStatus } from '../../utils/api';
import {
  LOAD_COLLECTIONS_REQUEST,
  LOAD_COLLECTIONS_SUCCESS,
  LOAD_COLLECTIONS_FAILURE
} from '../../constants';

const collectionsRequest = () => ({
  type: LOAD_COLLECTIONS_REQUEST
});

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
const collectionsSuccess = (page) =>
  payload => ({
      type: LOAD_COLLECTIONS_SUCCESS,
      payload: payload.data.results,
      meta: Object.assign({}, payload.data.metadata, {
        lastFetched: Date.now()
      })
    });

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
const collectionsFailure = () =>
  error => ({
    type: LOAD_COLLECTIONS_FAILURE,
    payload: error,
    error: true
  });

export function loadCollections (page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;

    dispatch(collectionsRequest(page));

    axios.get(`${protocol}://${host}/api/v0/collections?page=${page}`)
      .then(payload => {
        dispatch(collectionsSuccess(page)(payload))
      })
      .catch((error) => {
        console.error(`Error in reducer that handles ${LOAD_COLLECTIONS_SUCCESS}: `, error);
        const response = error.response;
        if (response === undefined) {
          dispatch(collectionsFailure(error));
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
            dispatch(collectionsFailure(error));
          });
        }
      });
  }
}

function fetchTopCollections(page = 1) {
  const url = `${API_ROOT}/api/v1/scm/collections?${page}`;
  return callApi(url, null, collectionsRequest(page), collectionsSuccess(page), collectionsFailure(page));
}


function shouldFetchCollections(state, page) {
  // Check cache first
  const collections = state.collectionsByPage[page];
  if (!collections) {
    // Not cached, should fetch
    return true;
  }

  if (collections.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return collections.didInvalidate;
}

export function fetchTopCollectionsIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchCollections(getState(), page)) {
      return dispatch(fetchTopCollections(page));
    }
  };
}
