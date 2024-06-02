// @/utils/data-helpers/groupAssetsForTreemap.js

export const groupAssetsForTreemap = (assets, groupByKey) => {
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
      tickerFound.value += asset.total_today_brl;
    });
  
    return Object.values(resultMap);
  };
  