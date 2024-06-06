import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      // Se estiver no lado do servidor, retorna o valor inicial diretamente
      return initialValue;
    }
    // No lado do cliente, tenta buscar o valor em localStorage
    const item = window.localStorage.getItem(key);
    return item ? item : initialValue;
  });

  // Função para atualizar o valor armazenado em localStorage e no estado
  const setValue = (value) => {
    if (typeof window !== "undefined") {
      setStoredValue(value);
      if (value === undefined) {
        window.localStorage.removeItem(key); // Remove o item se o valor é undefined
      } else {
        window.localStorage.setItem(key, value); // Atualiza o item no localStorage
      }
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
