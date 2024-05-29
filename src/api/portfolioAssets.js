// @api/portfolioAssets.js

import { request } from '@/utils';
 
export function addPortfolioAsset(data, token) {
    return request('/api/add-portfolio-asset', { 
        data, 
        token, 
        method: 'POST', 
        message: 'Successfully added asset'
    });
}

export function fetchPortfolioAssets(id, token) {
    return request(`/api/portfolios/${id}/assets`, { token });
}

export function updatePortfolioAsset(id, data, token) {
    return request(`/api/portfolio_assets/${id}`, { data, token, method: "PATCH", message: 'Ativo atualizado com sucesso' });
}

export function removePortfolioAsset(id, token) {
    return request(`/api/portfolio_assets/${id}`, { token, method: "DELETE", message: 'Ativo deletado com sucesso' });
}

