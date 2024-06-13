import React, { useState, useEffect } from 'react';

const LocalCheck = () => {
    // Estado para armazenar e exibir o conteúdo do localStorage
    const [localStorageContent, setLocalStorageContent] = useState({});

    // Lista de chaves a serem ignoradas
    const ignoreList = [
        'binance-http://localhost:3000',
        'trust:cache:timestamp',
        'ethereum-http://localhost:3000',
        'ally-supports-cache',
        'loglevel'
    ];

    // Efeito para carregar o conteúdo do localStorage ao iniciar o componente
    useEffect(() => {
        loadLocalStorage();
    }, []);

    // Função para carregar o conteúdo do localStorage
    const loadLocalStorage = () => {
        const content = {};
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (!ignoreList.includes(key)) { // Verifica se a chave atual está na lista de ignorados
                content[key] = window.localStorage.getItem(key);
            }
        }
        const sortedContent = Object.keys(content).sort().reduce((obj, key) => {
            obj[key] = content[key];
            return obj;
        }, {});
        setLocalStorageContent(sortedContent);
    };

    // Função para limpar o localStorage
    const clearLocalStorage = () => {
        window.localStorage.clear();
        setLocalStorageContent({});
        console.log("LocalStorage limpo!");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Verificação do LocalStorage</h1>
            <button onClick={loadLocalStorage} style={{ margin: '10px', padding: '10px' }}>
                Carregar LocalStorage
            </button>
            <button onClick={clearLocalStorage} style={{ margin: '10px', padding: '10px' }}>
                Limpar LocalStorage
            </button>
            <div style={{ marginTop: '20px' }}>
                <h2>Conteúdo do LocalStorage:</h2>
                <pre>{JSON.stringify(localStorageContent, null, 2)}</pre>
            </div>
        </div>
    );
};

export default LocalCheck;
