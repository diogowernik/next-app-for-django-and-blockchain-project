import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const colorPalette = [
  '#5470C6', '#91CC75', '#FAC858', '#73C0DE',
  '#3BA272', '#FC8452', '#007B83', '#EA7CCC', '#9A60B4'
];

// Função para transformar os dados
const transformDataForChart = (assets) => {
  let monthYearData = {};
  let categories = new Set();

  assets.forEach(asset => {
    const monthYear = asset.pay_date_by_month_year;
    const category = asset.category;
    const totalDividend = asset.total_dividend_brl;

    categories.add(category);

    if (!monthYearData[monthYear]) {
      monthYearData[monthYear] = {};
    }

    if (!monthYearData[monthYear][category]) {
      monthYearData[monthYear][category] = 0;
    }

    monthYearData[monthYear][category] += totalDividend;
  });

  const sortedMonths = Object.keys(monthYearData).sort((a, b) => {
    const [monthA, yearA] = a.split('/').map(Number);
    const [monthB, yearB] = b.split('/').map(Number);
    return yearA - yearB || monthA - monthB;
  });

  const series = Array.from(categories).map((category, index) => ({
    name: category,
    type: 'bar',
    stack: 'dividends',
    data: sortedMonths.map(monthYear => monthYearData[monthYear][category] || 0),
    itemStyle: { color: colorPalette[index % colorPalette.length] }
  }));

  return { sortedMonths, series };
}

const DividendsStakedChart = ({ assets }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ sortedMonths: [], series: [] });

  useEffect(() => {
    const transformedData = transformDataForChart(assets);
    setChartData(transformedData);
  }, [assets]);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: { data: chartData.series.map(serie => serie.name) },
      xAxis: {
        type: 'category',
        data: chartData.sortedMonths
      },
      yAxis: { type: 'value' },
      series: chartData.series
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [chartData]);

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
            Gráfico de Dividendos Mensais por Categoria
          </Typography>
        }
      />
      <CardContent>
        <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
      </CardContent>
    </Card>
  );
};

export default DividendsStakedChart;
