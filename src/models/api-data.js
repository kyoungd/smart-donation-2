import { getResourceId } from './api';
import config from './config';

const getDashboardDonorPost = (result) => {
    const { data } = result;
    const dashboard = {
        productName : data.name,
        id: data.entityId,
        title: data.name,
        html: data.html,
        status: data.approvalStatus,
        video: data.video,
        slug: `${config.default.pageDonorProduct}?${getResourceId(data.entityId)}`,
        backslug: `${config.default.pageDonorDonation}?${getResourceId(data.donation)}`,
        createdOn: data.createdOn
    }
    return dashboard;
}

export default getDashboardDonorPost;
