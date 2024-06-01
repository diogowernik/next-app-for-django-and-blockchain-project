

import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      // not displaying the legend
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Setores',
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
          }))
        },
        {
          name: 'Empresas',
          type: 'pie',
          radius: ['40%', '55%'],
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{b}: {c} ({d}%)'
          },
          data: data.flatMap(item => item.children)
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

export const PortfolioAssetsChart = () => {
  const pieData = [
    { name: 'Energia Elétrica', value: 6000, children: [
      { name: 'TAEE11', value: 3000 },
      { name: 'EGIE3', value: 3000 }
    ]},
    { name: 'Químicos', value: 3000, children: [
      { name: 'UNIP6', value: 3000 }
    ]}
    // Adicione mais dados conforme necessário
  ];

  return (

    <PieChartComponent data={pieData} />
  );
}

