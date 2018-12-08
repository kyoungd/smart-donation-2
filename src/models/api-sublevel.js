import config from 'config/SiteConfig';
import ApiDonorPostList from './api-donor-postlist';
import { ApiCustomerCampaignRequest } from './api-customer-campaignrequest';

export default async function (siteState, entityId) {
  switch (siteState) {
    case config.siteStateDonor : 
      return await ApiDonorPostList(entityId);
    case config.siteStateCustomer :
      return await ApiCustomerCampaignRequest(entityId);
    default:
      return {}
  }
}
