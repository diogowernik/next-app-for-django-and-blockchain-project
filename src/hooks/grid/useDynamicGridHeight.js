import { useState, useEffect } from 'react';

/**
 * Hook para calcular a altura dinâmica de um DataGrid baseada no número de linhas.
 * Permite definição de altura mínima, máxima e visível baseada no número de linhas.
 *
 * @param {Array} items - Array dos itens a serem renderizados no DataGrid.
 * @param {number} rowHeight - Altura de cada linha no DataGrid, padrão 80 pixels.
 * @param {number} maxVisibleRows - Número máximo de linhas visíveis antes de iniciar a rolagem.
 * @param {number} maxHeight - Altura máxima do DataGrid.
 * @param {number} minHeight - Altura mínima do DataGrid.
 */
export const useDynamicGridHeight = (items, rowHeight = 80, maxVisibleRows = 10, maxHeight = 700, minHeight = 300) => {
    const [gridHeight, setGridHeight] = useState(`${minHeight}px`);

    useEffect(() => {
        const calculatedHeight = items.length * rowHeight;
        const visibleHeight = maxVisibleRows * rowHeight;
        let newHeight = calculatedHeight;

        if (calculatedHeight > maxHeight) {
            newHeight = maxHeight; // Aplica maxHeight com rolagem
        } else if (calculatedHeight > visibleHeight) {
            newHeight = visibleHeight; // Aplica altura visível calculada
        }

        // Aplica minHeight se a altura calculada for muito baixa
        setGridHeight(`${Math.max(newHeight, minHeight)}px`);
    }, [items, rowHeight, maxVisibleRows, maxHeight, minHeight]);

    return gridHeight;
};
