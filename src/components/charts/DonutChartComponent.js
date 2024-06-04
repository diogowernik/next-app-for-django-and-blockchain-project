import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', // royal-blue-web-color
  '#91CC75', // pistachio - verde claro
  '#FAC858', // saffron - amarelo
  '#73C0DE', // sky-blue - azul claro
  '#3BA272', // jade - verde escuro
  '#FC8452', // coral - laranja
  '#007B83', // teal - verde azulado
  '#9A60B4', // purpureus - roxo
  '#EA7CCC', // rose-pink - rosa



];

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
          name: 'Portfolio',
          type: 'pie',
          radius: ['35%', '60%'],
          avoidLabelOverlap: false,
          label: {
            formatter: '{b}: {c} ({d}%)',
          },
          labelLine: {
            length: 30,
          },
          color: colorPalette, // Aplicando a paleta de cores
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
``
