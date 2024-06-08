import { useState, useEffect } from 'react';

function safeParseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return value;
  }
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? safeParseJSON(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key \"" + key + "\":", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      if (typeof window !== 'undefined') {
        let valueToStore;
        if (Array.isArray(value)) {  // Verifica se o valor é um array
          valueToStore = JSON.stringify(value);  // Converte o array em string JSON
        } else if (typeof value === 'string' || typeof value === 'number') {
          valueToStore = value;  // Usa o valor como está se for string ou número
        } else {
          valueToStore = safeStringify(value);  // Usa safeStringify para outros tipos de objetos
        }
        if (valueToStore !== 'null' && valueToStore !== '[]' && valueToStore !== '{}') {
          window.localStorage.setItem(key, valueToStore);
          setStoredValue(value);
        }
      }
    } catch (error) {
      console.error("Error writing to localStorage key \"" + key + "\":", error);
    }
  };
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? safeParseJSON(item) : initialValue);
      } catch (error) {
        console.error("Error reading localStorage key \"" + key + "\" on effect:", error);
        setStoredValue(initialValue);
      }
    }
  }, [key]);

  return [storedValue, setValue];
};
