// @/hooks/auth/satswallet/useLocalStorage.js

import { useState } from "react";

// Hook para gerenciar Local Storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error("Error parsing localStorage item:", error);
          // Aqui pode ser um lugar para decidir como lidar com dados corrompidos
          // Por exemplo, remover o item corrompido:
          localStorage.removeItem(key);
        }
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
