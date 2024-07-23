// @/api/valuations.js
import { request } from '@/utils';

// fetchValuations
export function fetchValuations(id, token) {
    return request(`/api/portfolios/${id}/valuations`, { token });
}
