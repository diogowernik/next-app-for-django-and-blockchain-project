import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', '#91CC75', '#FAC858', '#73C0DE',
  '#3BA272', '#FC8452', '#007B83', '#EA7CCC', '#9A60B4'
];

const ValuationTotalChart = ({ valuations }) => {
  const prepareChartData = (valuations) => {
    return valuations.map((valuation) => ({
      date: valuation.date,
      total_brl: valuation.total_brl,
      total_usd: valuation.total_usd,
    }));
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const data = prepareChartData(valuations).reverse();

    const option = {
      color: colorPalette,
      title: {
        text: 'Valuations Over Time (Total BRL & USD)',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total BRL', 'Total USD'],
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
      },
      yAxis: {
        type: 'value',
        name: 'Total',
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100,
        },
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: 'Total BRL',
          type: 'line',
          data: data.map(item => item.total_brl),
        },
        {
          name: 'Total USD',
          type: 'line',
          data: data.map(item => item.total_usd),
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [valuations]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default ValuationTotalChart;
