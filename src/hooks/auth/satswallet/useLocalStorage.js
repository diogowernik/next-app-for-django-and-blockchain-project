// @/hooks/auth/satswallet/useLocalStorage.js

import { useState, useEffect, useMemo } from "react";

// Hook para gerenciar Local Storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  };

  return [storedValue, setValue];
};


