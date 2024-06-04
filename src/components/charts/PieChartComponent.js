import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  // '#FC8452', // coral
  // '#9A60B4', // purpureus
  // '#FAC858', // saffron
  // '#91CC75', // pistachio
  '#5470C6', // royal-blue-web-color
  '#73C0DE', // sky-blue
  '#3BA272', // jade
  '#EA7CCC', // rose-pink

];

const colorPalette2 = [
  // '#EA7CCC', // rose-pink
  // '#3BA272', // jade
  // '#73C0DE', // sky-blue
  // '#5470C6', // royal-blue-web-color
  '#91CC75', // pistachio
  '#FAC858', // saffron
  '#9A60B4', // purpureus
  '#FC8452', // coral
];



export const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
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
          data: data.map(item => ({
            name: item.name,
            value: item.value
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
          data: data.flatMap(item => item.children),
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
