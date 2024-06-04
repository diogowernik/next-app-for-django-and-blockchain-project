import { useMemo } from 'react';

export const useTotalGridData = (assets, groupByKey, valueKey) => {
  return useMemo(() => {
    const totalsMap = {};
    let totalValue = 0;

    assets.forEach((asset) => {
      const key = asset[groupByKey];
      const valueToAdd = asset[valueKey];
      if (!totalsMap[key]) {
        totalsMap[key] = 0;
      }
      totalsMap[key] += valueToAdd;
      totalValue += valueToAdd;
    });

    const data = Object.entries(totalsMap).map(([key, value]) => ({
      id: key,  // id is necessary for DataGrid to function properly
      name: key,
      total: value.toFixed(2),
      porcentagem: ((value / totalValue) * 100).toFixed(2) + '%'
    }));
    // order from highest to lowest
    data.sort((a, b) => b.total - a.total);

    return data;
  }, [assets, groupByKey, valueKey]);
};
