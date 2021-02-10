import axios from 'axios';

export const getList = () => axios.get('http://hotline.whalemuseum.org/api.json').then(r => r.data);

export const getSighting = (id) => axios.get(`http://hotline.whalemuseum.org/api/${id}.json`).then(r => r.data);

export default {
    getList,
    getSighting,
};
