import axios from 'axios';
import { 
    SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH
  } from 'actions/types';
import { getRoot, getRootHelper, setDataOk, setMessage } from './root';
import { saveNewCampaign, saveExistingCampaign } from './campaign';
import { saveNewDonation, saveExistingDonation } from './donation';
import { saveExistingProduct } from './product';
import { getSublevel, saveApproval } from './sublevel';

export { 
  getRoot, getRootHelper, setDataOk, setMessage,
  saveNewCampaign, saveExistingCampaign,
  saveNewDonation, saveExistingDonation,
  saveExistingProduct,
  getSublevel, saveApproval
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
