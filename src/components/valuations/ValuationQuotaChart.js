import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', '#91CC75', '#FAC858', '#73C0DE',
  '#3BA272', '#FC8452', '#007B83', '#EA7CCC', '#9A60B4'
];

const ValuationQuotaChart = ({ valuations }) => {
  const prepareChartData = (valuations) => {
    return valuations.map((valuation) => ({
      date: valuation.date,
      quota_price_brl: valuation.quota_price_brl,
      quota_price_usd: valuation.quota_price_usd,
    }));
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const data = prepareChartData(valuations).reverse();

    const option = {
      color: colorPalette,
      title: {
        text: 'Quota Price Over Time (BRL & USD)',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Quota Price BRL', 'Quota Price USD'],
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
      },
      yAxis: {
        type: 'value',
        name: 'Quota Price',
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
          name: 'Quota Price BRL',
          type: 'line',
          data: data.map(item => item.quota_price_brl),
        },
        {
          name: 'Quota Price USD',
          type: 'line',
          data: data.map(item => item.quota_price_usd),
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

export default ValuationQuotaChart;
