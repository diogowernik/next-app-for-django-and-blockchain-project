// @/utils/grid/dataGridActions.js

export async function onRemoveAsset(id, removeAssetApi, updateStateCallback, token, enqueueSnackbar) {
    const isDeleted = await removeAssetApi(id, token);
    if (isDeleted) {
        updateStateCallback(prev => prev.filter(asset => asset.id !== id));
        enqueueSnackbar("Asset deleted successfully", { variant: 'success' });
    } else {
        enqueueSnackbar("Failed to delete asset", { variant: 'error' });
    }
}

export async function processRowUpdate(newRow, updateAssetApi, token, fieldsToUpdate, enqueueSnackbar) {
    try {
        const flatData = {};
        Object.keys(fieldsToUpdate).forEach(field => {
            flatData[field] = newRow[field];
        });

        const updatedRow = await updateAssetApi(newRow.id, flatData, token);
        enqueueSnackbar("Asset updated successfully", { variant: 'success' });
        return { ...newRow, ...updatedRow };
    } catch (error) {
        enqueueSnackbar("Failed to update asset", { variant: 'error' });
        throw error;
    }
}
