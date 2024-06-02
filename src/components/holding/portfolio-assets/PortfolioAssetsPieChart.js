

import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { usePieChartDataByTickerAndCategory } from '@/hooks/data/usePieChartDataByTickerAndCategory';
import { usePieChartDataByTickerAndSubcategory } from '@/hooks/data/usePieChartDataByTickerAndSubcategory';

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
        show: false
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

  return <div ref={chartRef} style={{ width: '100%', height: '520px' }} />;
};

export const PortfolioAssetsPieChart = ({ assets }) => {
  // const pieData = usePieChartDataByTickerAndCategory(assets);  // Use o hook para transformar os dados
  const pieData = usePieChartDataByTickerAndSubcategory(assets);  // Use o hook para transformar os dados

  return (
    <PieChartComponent data={pieData} />
  );
};
