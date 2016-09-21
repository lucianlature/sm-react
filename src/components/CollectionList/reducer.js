/**
 * Created by Lucian on 16/09/2016.
 */

import * as types from '../../constants';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null
};

export default function collections (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COLLECTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.LOAD_COLLECTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        page: action.meta.page,
        page: action.meta.page,
        isLoading: false
      };
    case types.LOAD_COLLECTIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Example of a co-located selector
export const selectCollections = state => state.collections;
