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
          }))
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

