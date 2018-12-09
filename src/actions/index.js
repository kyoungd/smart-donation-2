import axios from 'axios';
import { 
    SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH, 
    DATA_OK, MESSAGE, GET_ROOT, GET_ROOT_HELPER 
  } from 'actions/types';
import ApiRoot from '../models/api-root.js';
import ApiRootHelper from '../models/api-root-helper.js';
import config from 'config/SiteConfig';

export const getRoot = (callback) => async dispatch => {
  try {
    const data = await ApiRoot(config.siteState);
    dispatch({type: GET_ROOT, payload: data});
    callback();
  } catch (err) {
    dispatch({type: MESSAGE, payload: 'error - actions/index.js/getRoot()'});
  }
}

export const getRootHelper = (callback) => async dispatch => {
  try {
    const helper = await ApiRootHelper(config.siteState);
    dispatch({type: GET_ROOT_HELPER, payload: helper});
    callback();
  } catch (err) {
    dispatch({type: MESSAGE, payload: 'error - actions/index.js/getRootHelper()'});
  }
}

export function setDataOk (dataOk) {
  return {type: DATA_OK, payload: dataOk};
}

export function setMessage (message) {
  return {type: MESSAGE, payload: message};
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
