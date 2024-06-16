import { useState, useEffect, useCallback } from 'react';

function usePersistentToggle(key, defaultValue) {
    // Inicializa o estado com defaultValue para evitar referência a localStorage durante SSR
    const [state, setState] = useState(defaultValue);

    // Efeito para atualizar o estado com o valor armazenado após o componente ser montado no cliente
    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        // Atualiza o estado se um valor válido for encontrado no localStorage
        if (storedValue !== null) {
            setState(JSON.parse(storedValue));
        }
    }, [key]);

    const toggle = useCallback(() => {
        setState(prevState => {
            const newState = !prevState;
            localStorage.setItem(key, JSON.stringify(newState));
            return newState;
        });
    }, [key]);

    return [state, toggle];
}

export default usePersistentToggle;
