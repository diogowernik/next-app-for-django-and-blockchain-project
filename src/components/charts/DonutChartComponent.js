import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export const DonutChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Portfolio Breakdown',
          type: 'pie',
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%',
            color: 'auto' // Define a cor do texto automaticamente para melhor contraste
          },
          labelLine: {
            show: true,
            length: 10, // Comprimento da linha que conecta o texto à fatia
            length2: 20, // Comprimento da segunda parte da linha após o ponto de dobra
            smooth: 0.5 // Suavização da curva da linha
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          data: data
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
