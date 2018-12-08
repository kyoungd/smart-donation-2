import config from 'config/SiteConfig';
import ApiCampaignDonation from './api-customer-donation';

export default async function (siteState) {
    return (siteState === config.siteStateCustomer ? await ApiCampaignDonation() : {})
}
