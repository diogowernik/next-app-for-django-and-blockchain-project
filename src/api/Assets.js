// @/api/Assets

import { request } from '@/utils';

export function fetchAssets(token) {
    return request('/api/assets/', { token });
}

