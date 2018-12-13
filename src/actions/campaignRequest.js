import { NEW_REQUEST, SAVE_REQUEST } from 'actions/types';
import SetBlockchain from 'models/api-post';

const _ = require('lodash');

export const saveNewRequest = (request, callback) => async dispatch => {
  try {
    console.log('action/CampaignRequest.saveNewRequest()');
    let formData = _.cloneDeep(request);
    formData.entityId = 'new';
    formData.name = request.name;
    formData.description = request.description;
    formData.approvalStatus = request.status;
    formData.status = request.rfp;
    formData.supplier = request.supplier;
    const result = await SetBlockchain('campaignrequest', formData)
    let data = _.cloneDeep(formData);
    if (result.status === 200) {
      data.id = result.data.entityId;
      data.entityId = result.data.entityId;
      console.log('RequestPage.saveNew() request saved.  call dispatch. ');
      dispatch({type: NEW_REQUEST, payload: data});
      callback();
    }
    else {
      throw new Error('unknown result status on RequestPage.js/saveNewRequest() ' + result);
    }
  }
  catch(err) {
    console.log('RequestPage.saveNewRequest() error ', err);
  }
}

export const saveExistingRequest = (request, callback) => async dispatch => {
  try {
    let formData = _.cloneDeep(request);
    formData.name = request.name;
    formData.entityId = request.id;
    formData.description = request.description;
    formData.approvalStatus = request.status;
    formData.status = request.rfp;
    formData.supplier = request.supplier;
    console.log('actions/campaignRequest/saveEdit: 1');
    const result = await SetBlockchain('campaignrequest', formData)
    if (result.status === 200) {
      console.log('actions/campaignRequest/saveEdit: 2');
      const data = _.cloneDeep(request);
      dispatch({type: SAVE_REQUEST, payload: data});
    }
    else {
      throw new Error('unknown result status on RequestPage.js/saveExitingRequest() ' + result);
    }
    callback();
  }
  catch(err) {
    console.log('RequestPage.saveExistingRequest() error ', err);
  }
}
