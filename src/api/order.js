import {createdAxios} from '../common/http';
const instance = createdAxios('order');

export function updateOrderStatus(params) {
    return instance.post('updateOrderStatus', params);
  }