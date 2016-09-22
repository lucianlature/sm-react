/**
 * Created by Lucian on 17/09/2016.
 */

import * as types from '../../constants';

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  title: '',
  content: ''
};

export default function currentCollection (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COLLECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.LOAD_COLLECTION_SUCCESS:
      return {
        ...state,
        title: action.collection.title,
        slug: action.collection.slug,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case types.LOAD_COLLECTION_FAILURE:
      return {
        ...state,
        error: action.collection
      };
    default:
      return state;
  }
}

// Example of a co-located selector
export const selectCurrentCollection = state => state.currentCollection;
