// @/hooks/auth/satswallet/useSatsSignOut.js

import { useCallback } from 'react';

export const useSatsSignOut = (setIsSatsAuthenticated, resetAddresses, enqueueSnackbar) => {
    const satsSignOut = useCallback(() => {
        console.log("Desconectando Sats Connect...");
        
        // Reseta os endereços e chaves públicas usando a função fornecida
        resetAddresses();

        // Reseta a autenticação
        setIsSatsAuthenticated(false);
        
        // Mostra mensagem de sucesso
        enqueueSnackbar('Disconnected successfully.', { variant: 'info' });
    }, [setIsSatsAuthenticated, resetAddresses, enqueueSnackbar]);

    return satsSignOut;
};
