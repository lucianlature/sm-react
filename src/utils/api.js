/**
 * Created by Lucian on 20/09/2016.
 */

export function checkStatus(response) {
  if (response.statusText !== 'OK') {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(url, config, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);

    return fetch(url, config)
      .then(checkStatus)
      .then((json) => {
        dispatch(onRequestSuccess(json.data));
      }).catch((error) => {
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then( (text) => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
        }
      });
  };
}
