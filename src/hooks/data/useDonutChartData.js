import { useMemo } from 'react';

export const useDonutChartData = (assets, groupByKey, valueKey) => {
  return useMemo(() => {
    const totalsMap = {};
    let totalValue = 0;

    // Agrupar valores por chave e somar os totais
    assets.forEach((asset) => {
      const key = asset[groupByKey];
      const valueToAdd = asset[valueKey];
      if (!totalsMap[key]) {
        totalsMap[key] = 0;
      }
      totalsMap[key] += valueToAdd;
      totalValue += valueToAdd;
    });

    // Converter os dados para o formato específico para o gráfico de rosca
    const data = Object.entries(totalsMap).map(([key, value]) => ({
      value: value.toFixed(2), // Valor total para a categoria
      name: key, // Nome da categoria para a legenda do gráfico
    //   percentage: ((value / totalValue) * 100).toFixed(2) // Porcentagem, opcional
    }));
    // Ordenar de maior para menor
    data.sort((a, b) => b.value - a.value);

    return data;
  }, [assets, groupByKey, valueKey]);
};
