// @/hooks/create/usePortfolioAssetAPI

import { useCallback } from 'react';
import { addPortfolioAsset } from '@/api/portfolioAssets'; // Importando de seu arquivo de API

export const useAddPortfolioAssetAPI = (djangoToken) => {
    const addAsset = useCallback(async (data) => {
        try {
            const response = await addPortfolioAsset(data, djangoToken);
            return { success: true, message: 'Ativo adicionado com sucesso', data: response };
        } catch (error) {
            console.error('Erro ao adicionar ativo:', error);
            return { success: false, message: 'Erro ao adicionar ativo', error };
        }
    }, [djangoToken]);

    return { addAsset };
};
