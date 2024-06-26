import { useMemo } from 'react';

export const usePieChartData = (assets, groupByKey, valueKey) => {
  return useMemo(() => {
    const groupAssetsForPiechart = (assets, groupByKey, valueKey) => {
      const resultMap = {};

      assets.forEach((asset) => {
        const groupValue = asset[groupByKey];
        if (!resultMap[groupValue]) {
          resultMap[groupValue] = {
            name: groupValue,
            value: 0,
            children: []
          };
        }

        let tickerFound = resultMap[groupValue].children.find(ticker => ticker.name === asset.ticker);
        if (!tickerFound) {
          tickerFound = { name: asset.ticker, value: 0 };
          resultMap[groupValue].children.push(tickerFound);
        }

        const addedValue = parseFloat((asset[valueKey]).toFixed(2));
        tickerFound.value += addedValue;
        resultMap[groupValue].value += addedValue;
      });

      return Object.values(resultMap);
    };

    return groupAssetsForPiechart(assets, groupByKey, valueKey);
  }, [assets, groupByKey, valueKey]);
};
