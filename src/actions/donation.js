import { NEW_DONATION, SAVE_DONATION } from 'actions/types';
import SetBlockchain from 'models/api-post';

const _ = require('lodash');

export const saveNewDonation = (donation, callback) => async dispatch => {
  try {
    const accountInfo = {
      entityId: 'new',
      accountNumber: donation.account,
      routingNumber: donation.routing,
    }
    console.log('DonationPage.saveNew() bankaccount ');
    const account = await SetBlockchain('bankaccount', accountInfo)
    console.log('DonationPage.saveNew() donation 1 ');
    const bankaccount = account.data.entityId;
    let formData = _.cloneDeep(donation);
    formData.availableOn = donation.availableOn;
    formData.expireOn = donation.expireOn;
    formData.name = donation.title;
    formData.rules = donation.rules.split('.').map(rule => rule + '.');
    formData.description = donation.description;
    formData.entityId = donation.id;
    formData.bankAccount = bankaccount;
    formData.customer = donation.customer;
    formData.donor = donation.donor;
    formData.rules = donation.rules.split('.');
    let data = _.cloneDeep(formData);
    console.log('DonationPage.saveNew() donation 2 ');
    const result = await SetBlockchain('donation', formData);
    if (result.status === 200) {
      console.log('DonationPage.saveNew() donation saved 1 ');
      data.id = result.data.entityId;
      dispatch({type: NEW_DONATION, payload: data});
      callback();
    }
    else {
      throw new Error('unknown result status on donation.js/saveNewDonation() ' + result);
    }
  }
  catch(err) {
    console.log('DonationPage.saveNewDonation() error ', err);
  }
}

export const saveExistingDonation = (donation, callback) => async dispatch => {
  try {
    console.log('saveEdit: 1');
    let formData = _.cloneDeep(donation);
    formData.availableOn = donation.availableOn;
    formData.expireOn = donation.expireOn;
    formData.name = donation.title;
    formData.entityId = donation.id;
    formData.rules = donation.rules.split('.').map(rule => rule + '.');
    formData.description = donation.description;
    console.log('saveEdit: 2');
    const result = await SetBlockchain('donation', formData)
    if (result.status === 200) {
      console.log('saveEdit: 3');
      console.log(result.statusText);
      const data = _.cloneDeep(donation);
      dispatch({type: SAVE_DONATION, payload: data});
    }
    else {
      throw new Error('unknown result status on donation.js/saveExitingDonation() ' + result);
    }
    callback();
  }
  catch(err) {
    console.log('DonationPage.saveExistingDonation() error ', err);
  }
}
