import { useState, useCallback } from 'react';

export const useModalState = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    // useCallback sem dependências desnecessárias
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return { isOpen, openModal, closeModal };
};
