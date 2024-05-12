// @api/portfolio_assets.js

import { request } from '@/utils';


export function fetchPortfolioAssets(id, token) {
    return request(`/api/portfolios/${id}/assets`, { token });
}
 
export function addPortfolioAsset(data, token) {
    return request('/api/portfolio_assets/', { data, token, method: 'POST', message: 'Ativo adicionado com sucesso' });
}

export function updatePortfolioAsset(id, data, token) {
    return request(`/api/portfolio_assets/${id}`, { data, token, method: "PATCH", message: 'Ativo atualizado com sucesso' });
}

export function removePortfolioAsset(id, token) {
    return request(`/api/portfolio_assets/${id}`, { token, method: "DELETE", message: 'Ativo deletado com sucesso' });
}

