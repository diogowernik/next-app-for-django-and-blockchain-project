import { useMemo } from 'react';

export const useTreemapData = (assets, groupByKey, valueKey) => {
  return useMemo(() => {
    // Função de agrupamento integrada
    const groupAssetsForTreemap = (assets, groupByKey, valueKey) => {
      const resultMap = {};

      assets.forEach((asset) => {
        if (!resultMap[asset[groupByKey]]) {
          resultMap[asset[groupByKey]] = {
            name: asset[groupByKey],
            children: []
          };
        }
        const group = resultMap[asset[groupByKey]];

        let tickerFound = group.children.find(t => t.name === asset.ticker);
        if (!tickerFound) {
          tickerFound = {
            name: asset.ticker,
            value: 0 // Inicializa o valor
          };
          group.children.push(tickerFound);
        }
        
        // Acumula o valor por ticker
        tickerFound.value += asset[valueKey];  // Agora usando valueKey
      });

      return Object.values(resultMap);
    };

    // Estrutura de dados para o treemap
    const data = {
      name: 'portfolio',
      children: groupAssetsForTreemap(assets, groupByKey, valueKey)
    };

    return data;
  }, [assets, groupByKey, valueKey]);
};
