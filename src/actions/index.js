import axios from 'axios';
import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH, SHOW_LOADING, GET_ROOT } from 'actions/types';
import ApiRoot from '../models/api-root.js';
import ApiRootHelper from '../models/api-root-helper.js';
import config from 'config/SiteConfig';

export const getRoot = (callback) => async dispatch => {
  try {
    dispatch({type: SHOW_LOADING, payload: true});
    const data = await ApiRoot(config.siteState);
    const helper = await ApiRootHelper(config.siteState);
    const dataSet = {data, helper, dataOk: true};
    dispatch({type: SHOW_LOADING, payload: false});
    dispatch({type: GET_ROOT, payload: dataSet});
    callback();
  } catch (err) {
    dispatch({type: SHOW_LOADING, payload: 'error while signing up'})
  }
}

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}

export function fetchComments() {
  
  const response = axios.get('http://jsonplaceholder.typicode.com/comments');

  return {
    type: FETCH_COMMENTS,
    payload: response
  };
}

export function changeAuth(loginUser) {
  return {
    type: CHANGE_AUTH,
    payload: loginUser
  }
}
