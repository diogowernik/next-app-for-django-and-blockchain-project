// @/hooks/pages/useAssetManagement.js

// Simplify the hook to handle only the update and delete logic
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { updatePortfolioAsset, removePortfolioAsset } from '@/api/portfolioAssets';
import { processRowUpdate, onRemoveAsset } from '@/utils/grid';

export const useGridManagement = (authToken, setAssets) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleProcessRowUpdate = useCallback((newRow) => {
        const fieldsToUpdate = {
            shares_amount: true,
            share_average_price_brl: true,
            share_average_price_usd: true,
        };
        return processRowUpdate(newRow, updatePortfolioAsset, authToken, fieldsToUpdate, enqueueSnackbar);
    }, [authToken, enqueueSnackbar]);

    const handleDeleteAsset = useCallback((assetId) => {
        onRemoveAsset(assetId, removePortfolioAsset, setAssets, authToken, enqueueSnackbar);
    }, [authToken, setAssets, enqueueSnackbar]);

    return { handleProcessRowUpdate, handleDeleteAsset };
};
