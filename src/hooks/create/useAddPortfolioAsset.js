import { useCallback, useState } from 'react';
import { useAddPortfolioAssetAPI } from "./useAddPortfolioAssetAPI"; // Importação renomeada
import { useModalState } from "./useModalState";

export const useAddPortfolioAsset = (djangoToken) => {
    const { isOpen, openModal, closeModal } = useModalState();
    const { addAsset } = useAddPortfolioAssetAPI(djangoToken);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddAsset = useCallback(async (data) => {
        setIsLoading(true);
        setError(null);  // Resetting error state on new submission attempt

        try {
            const response = await addAsset(data);
            if (response.success) {
                closeModal();
                setIsLoading(false);
                return response;  // Successfully added asset
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            console.error("Error adding asset:", err);
            setError(err.message || "An unknown error occurred");
            setIsLoading(false);
        }
    }, [addAsset, closeModal]);

    return { isOpen, openModal, closeModal, handleAddAsset, isLoading, error };
};
