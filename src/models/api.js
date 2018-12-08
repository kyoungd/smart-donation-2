import axios from 'axios';
import endpoints from './endpoints';
import config from './config';

const url = (model, ix) =>
  `${config.default.endpointBlockchainApi}${endpoints[model.toLowerCase()]}` + (ix ? `/${ix}` : '');

export const get = async (model, ix) => {
  try {
    const result = await axios.get(url(model, ix));
    return result;
  } catch (err) {
    console.log(url(model, ix));
    console.log(err);
  }
};

export const post = async (model, data) => {
  try {
    const result = await axios.post(url(model), data);
    console.log(result);
    return result;
  } catch (err) {
    console.log(url(model));
    console.log(err);
  }
};

export const put = async (model, data, ix) => {
  try {
    const result = await axios.put(url(model, ix), data);
    return result;
  } catch (err) {
    console.log(url(model, data, ix));
    console.log(err);
  }
};

export const remove = async (model, ix) => {
  try {
    const result = await axios.delete(url(model, ix));
    return result;
  } catch (err) {
    console.log(url(model, ix));
    console.log(err);
  }
};

export const getResourceId = rid => (rid.includes('resource') ? rid.split('#')[1] : rid);

export const makeResourceId = (model, id) =>
  id.includes('resource') ? id : 'resource:' + endpoints[model].slice(1, endpoints[model].length) + '#' + id;

