import { useState, useEffect, useCallback } from 'react';

function usePersistentToggle(key, defaultValue) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

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
