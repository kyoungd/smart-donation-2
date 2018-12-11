import { SAVE_PRODUCT } from 'actions/types';
import SetBlockchain from 'models/api-post';

const _ = require('lodash');


export const saveExistingProduct = (product, callback) => async dispatch => {
  try {
    let formData = _.cloneDeep(product);
    formData.name = product.name;
    formData.video = product.video;
    formData.excerpt = product.excerpt;
    formData.html = product.html;
    formData.approvalStatus =
      product.status === 'NOT_SUBMITTED' && product.rfp === 'COMPLETE' ? 'SUBMITTED' : product.status;
    formData.status = product.rfp;
    formData.entityId = product.product && product.product.length > 10 ? product.product : 'new';
    formData.id = formData.entityId;
    console.log('saveEdit: 1', JSON.stringify(formData, null, 2));
    const result = await SetBlockchain('product', formData);
    console.log('saveEdit: 2');
    if (result.status === 200) {
      console.log('saveEdit: 3', result);
      console.log(result.statusText);
      let data = _.cloneDeep(product); 
      // we are not using productId, but CampaignRequestId.  
      // That is why we don't need to re-assign data.id and data.entityId
      dispatch({type: SAVE_PRODUCT, payload: data});
    }
    else {
      throw new Error('unknown result status on actions/product.js/saveExitingProduct() ' + result);
    }
    callback();
  }
  catch(err) {
    console.log('actions/ProductPage/saveExistingProduct() error ', err);
  }
}
