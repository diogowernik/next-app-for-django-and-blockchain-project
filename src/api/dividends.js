import { request } from '@/utils';

// fetchPortfolioDividends
export function fetchDividends(id, token) {
    return request(`/api/portfolios/${id}/dividends`, { token });
  }
  