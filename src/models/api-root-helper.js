import config from 'config/SiteConfig';
const { ApiCampaignDonation } = require('./api-customer-donation');

export default async function (siteState) {
    return (siteState === config.siteStateCustomer ? await ApiCampaignDonation() : {})
}