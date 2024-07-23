import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', '#91CC75', '#FAC858', '#73C0DE',
  '#3BA272', '#FC8452', '#007B83', '#EA7CCC', '#9A60B4'
];

const StakedComponent = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const seriesWithColors = chartData.series.map((serie, index) => ({
      ...serie,
      itemStyle: { color: colorPalette[index % colorPalette.length] },
    }));

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
      series: seriesWithColors
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default StakedComponent;
