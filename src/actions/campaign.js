import { NEW_CAMPAIGN, SAVE_CAMPAIGN } from 'actions/types';
import SetBlockchain from 'models/api-post';
import { get } from 'models/api';

const _ = require('lodash');

export const saveNewCampaign = (campaign, callback) => async dispatch => {
  try {
    let bankaccount;
    const accountInfo = {
      entityId: 'new',
      accountNumber: campaign.account,
      routingNumber: campaign.routing,
    }
    console.log('CampaignPage.saveNew() bankaccount ');
    const account = await SetBlockchain('bankaccount', accountInfo);
    bankaccount = account.data.entityId;
    const donation = await get('donation', campaign.donation);
    console.log('CampaignPage.saveNew() campaign - get donation info ');
    let formData = _.cloneDeep(campaign);
    formData.availableOn = campaign.availableOn;
    formData.expireOn = campaign.expireOn;
    formData.name = campaign.title;
    formData.description = campaign.description;
    formData.entityId = campaign.id;
    formData.bankAccount = bankaccount;
    formData.customer = campaign.customer;
    formData.donor = donation.data.donor;
    formData.donation = campaign.donation;
    let data = _.cloneDeep(formData);
    console.log('CampaignPage.saveNew() campaign 3 - save data');
    const result = await SetBlockchain('campaign', formData);
    if (result.status === 200) {
      data.id = result.data.entityId;
      data.entityId = result.data.entityId;
      console.log('CampaignPage.saveNew() campaign saved.  call dispatch. ');
      dispatch({type: NEW_CAMPAIGN, payload: data});
      callback();
    }
    else {
      throw new Error('unknown result status on CampaignPage.js/saveNewCampaign() ' + result);
    }
  }
  catch(err) {
    console.log('CampaignPage.saveNewCampaign() error ', err);
  }
}

export const saveExistingCampaign = (campaign, callback) => async dispatch => {
  try {
    let formData = _.cloneDeep(campaign);
    formData.availableOn = campaign.availableOn;
    formData.expireOn = campaign.expireOn;
    formData.name = campaign.title;
    formData.entityId = campaign.id;
    formData.description = campaign.description;
    console.log('saveEdit: 1');
    const result = await SetBlockchain('campaign', formData);
    console.log('saveEdit: 2');
    if (result.status === 200) {
      console.log('saveEdit: 3');
      console.log(result.statusText);
      const data = _.cloneDeep(campaign);
      dispatch({type: SAVE_CAMPAIGN, payload: data});
    }
    else {
      throw new Error('unknown result status on CampaignPage.js/saveExitingCampaign() ' + result);
    }
    callback();
  }
  catch(err) {
    console.log('CampaignPage.saveExistingCampaign() error ', err);
  }
}
