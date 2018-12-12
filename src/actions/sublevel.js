import { GET_SUBLEVEL, MESSAGE, SAVE_APPROVAL } from 'actions/types';
import config from 'config/SiteConfig';
import ApiSublevel from '../models/api-sublevel';
import SetBlockchain from 'models/api-post';

export const getSublevel = (donationId, callback) => async dispatch => {
  try {
    const dashboard = await ApiSublevel(config.siteState, donationId);
    dispatch({type: GET_SUBLEVEL, payload: dashboard});
    callback();
  } catch (err) {
    dispatch({type: MESSAGE, payload: 'error - actions/sublevel.js/getSublevel()'});
  }
}

export const saveApproval = (post, callback) => async dispatch => {
  try {
    const formData = {
      entityId: post.product,
      approvalStatus: post.status,
      approvalResponse: post.approvalResponse,
    }
    console.log('UpdateApproval', formData);
    const result = await SetBlockchain('product', formData)
    if (result.status === 200) {
      console.log(result.statusText);
      dispatch({type: SAVE_APPROVAL, payload: post});
      callback();
    }
    else {
      throw new Error('unknown result status on sublevel.js/saveApproval() ' + result);
    }
  } catch (err) {
    dispatch({type: MESSAGE, payload: 'error - actions/sublevel.js/saveApproval() ' + err});
  }
}
