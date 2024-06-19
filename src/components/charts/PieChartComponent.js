import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', // royal-blue-web-color
  '#73C0DE', // sky-blue
  '#3BA272', // jade
  '#EA7CCC', // rose-pink
];

const colorPalette2 = [
  '#91CC75', // pistachio
  '#FAC858', // saffron
  '#9A60B4', // purpureus
  '#FC8452', // coral
];

export const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const sortedData = data.map(category => ({
      ...category,
      totalValue: parseFloat(category.children.reduce((acc, child) => acc + child.value, 0).toFixed(2)) // Calcula a soma total e arredonda
    })).sort((a, b) => b.totalValue - a.totalValue); // Ordena os dados pela soma total

    const chartInstance = echarts.init(chartRef.current);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'Categorias',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '40%'],
          label: {
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false
          },
          data: sortedData.map(item => ({
            name: item.name,
            value: item.totalValue
          })),
          color: colorPalette2
        },
        {
          name: 'Ativos',
          type: 'pie',
          radius: ['40%', '55%'],
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{b}: {c} ({d}%)'
          },
          data: sortedData.flatMap(item => item.children.map(child => ({ ...child, value: parseFloat(child.value.toFixed(2)) }))), // Arredonda os valores
          color: colorPalette
        }
      ]
    };

    chartInstance.setOption(option);
    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
