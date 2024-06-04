import { useMemo } from 'react';

export const useTotalGridData = (assets, groupByKey, valueKey) => {
  return useMemo(() => {
    const totalsMap = {};
    let totalValue = 0;

    // Calcula os totais por grupo e o valor total
    assets.forEach((asset) => {
      const key = asset[groupByKey];
      const valueToAdd = asset[valueKey];
      if (!totalsMap[key]) {
        totalsMap[key] = 0;
      }
      totalsMap[key] += valueToAdd;
      totalValue += valueToAdd;
    });

    // Cria os dados formatados para cada grupo
    const groupedData = Object.entries(totalsMap).map(([key, value]) => ({
      id: key,
      name: key,
      total: value.toFixed(2),
      percentage: ((value / totalValue) * 100).toFixed(2) + '%'  // Usando 'percentage'
    }));

    // Ordena os dados de maior para menor total
    groupedData.sort((a, b) => b.total - a.total);

    // Retorna os dados agrupados e o total geral
    return {
      data: groupedData,
      totalValue: totalValue.toFixed(2)  // Formata o valor total
    };
  }, [assets, groupByKey, valueKey]);
};
