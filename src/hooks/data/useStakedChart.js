import { useState, useEffect } from 'react';

const transformDataForChart = (assets, groupBy) => {
  let monthYearData = {};
  let groups = new Set();

  assets.forEach(asset => {
    const monthYear = asset.pay_date_by_month_year;
    const group = asset[groupBy];
    const totalDividend = asset.total_dividend_brl;

    groups.add(group);

    if (!monthYearData[monthYear]) {
      monthYearData[monthYear] = {};
    }

    if (!monthYearData[monthYear][group]) {
      monthYearData[monthYear][group] = 0;
    }

    monthYearData[monthYear][group] += totalDividend;
  });

  const sortedMonths = Object.keys(monthYearData).sort((a, b) => {
    const [monthA, yearA] = a.split('/').map(Number);
    const [monthB, yearB] = b.split('/').map(Number);
    return yearA - yearB || monthA - monthB;
  });

  const series = Array.from(groups).map((group) => ({
    name: group,
    type: 'bar',
    stack: 'dividends',
    data: sortedMonths.map(monthYear => monthYearData[monthYear][group] || 0),
  }));

  return { sortedMonths, series };
};

const useStakedChart = (assets, groupBy = 'category') => {
  const [chartData, setChartData] = useState({ sortedMonths: [], series: [] });

  useEffect(() => {
    const transformedData = transformDataForChart(assets, groupBy);
    setChartData(transformedData);
  }, [assets, groupBy]);

  return chartData;
};

export default useStakedChart;
