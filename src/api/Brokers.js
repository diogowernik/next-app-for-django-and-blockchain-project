// @/api/Brokers

import { request } from '@/utils';

export function fetchBrokers(token) {
    return request('/api/brokers/', { token });
}