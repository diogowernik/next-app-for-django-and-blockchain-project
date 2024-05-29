// @/hooks/create/useAddPortfolioAssetAPI
import { useCallback } from 'react';
import { addPortfolioAsset } from '@/api/portfolioAssets'; // Importando de seu arquivo de API

export const useAddPortfolioAssetAPI = (djangoToken) => {
    const addAsset = useCallback(async (data) => {
        const response = await addPortfolioAsset(data, djangoToken);
        return { success: true, message: 'Ativo adicionado com sucesso', data: response };
        // o erro já está sendo tratado no request.js, então não é necessário tratar aqui
    }, [djangoToken]);

    return { addAsset };
};
