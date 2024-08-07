import { useCallback, useState } from 'react';
import { useAddPortfolioAssetAPI } from "./useAddPortfolioAssetAPI";
import { useModalState } from "./useModalState";
import { useSnackbar } from 'notistack';

const mapAssetDataToGrid = (data) => {
    // console.log('Mapping data:', data);
    return {
        id: data.id,
        ticker: data.asset_ticker,
        shares_amount: data.shares_amount,
        share_average_price_brl: data.share_average_price_brl,
        share_average_price_usd: data.share_average_price_usd,
        total_today_brl: data.total_today_brl,
        total_today_usd: data.total_today_usd,
        geolocation: data.geolocation,
        category: data.category_name,
        broker: data.broker_name,
        delete: 'Delete' 
    };
};

export const useAddPortfolioAsset = (djangoToken, addAssetToGrid) => {
    const { isOpen, openModal, closeModal } = useModalState();
    const { addAsset } = useAddPortfolioAssetAPI(djangoToken);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddAsset = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await addAsset(data);
            setIsLoading(false);
            console.log('Response from addAsset:', response);
            if (response.success && response.data && response.data.data) {
                const mappedData = mapAssetDataToGrid(response.data.data);
                console.log('Mapped data:', mappedData);
                addAssetToGrid(mappedData);
                closeModal();
                enqueueSnackbar(response.message, { variant: 'success' });
            } else {
                enqueueSnackbar("Failed to add asset, data in a different format.", { variant: 'error' });
                console.log('Error response:', response);
            }
        } catch (err) {
            enqueueSnackbar(err.message || "An unknown error occurred", { variant: 'error' });
            console.log('Error in handleAddAsset:', err);
            setIsLoading(false);
        }
    }, [addAsset, closeModal, enqueueSnackbar, addAssetToGrid]);

    return { isOpen, openModal, closeModal, handleAddAsset, isLoading };
};
