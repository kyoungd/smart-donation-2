import config from 'config/SiteConfig';

import ApiDonationList from './api-donor-donation';
import ApiCampaignList from './api-customer-campaign';
import ApiSupplierRfpList from './api-supplier-rfp';

export default async function(siteState) {
  let data;
  switch (siteState) {
    case config.siteStateDonor:
      data = await ApiDonationList(config.siteCustomerId, config.siteDonorId);
      break;
    case config.siteStateCustomer:
      data = await ApiCampaignList(config.siteCustomerId);
      break;
    case config.siteStateSupplier:
      data = await ApiSupplierRfpList(config.siteSupplierId);
      break;
    default:
      data = undefined;
      break;
  }
  return data;
}
