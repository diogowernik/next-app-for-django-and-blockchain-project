import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

const colorPalette = [
  '#5470C6', // royal-blue-web-color
  '#91CC75', // pistachio - verde claro
  '#FAC858', // saffron - amarelo
  '#73C0DE', // sky-blue - azul claro
  '#3BA272', // jade - verde escuro
  '#FC8452', // coral - laranja
  '#007B83', // teal - verde azulado
  '#EA7CCC', // rose-pink - rosa
  '#9A60B4', // purpureus - roxo

];


export const TreemapComponent = ({ data }) => {
  const chartRef = useRef(null);
  const [visibleSectors, setVisibleSectors] = useState([]);
  const [sectorColors, setSectorColors] = useState({});

  // Atualiza as cores iniciais para cada setor usando a paleta de cores
  useEffect(() => {
    const initialColors = {};
    data.children.forEach((child, index) => {
      initialColors[child.name] = colorPalette[index % colorPalette.length]; // Cicla através da paleta de cores
    });
    setSectorColors(initialColors);
    setVisibleSectors(data.children.map(child => child.name));
  }, [data]);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const filteredChartData = data.children.filter(child => visibleSectors.includes(child.name))
                                      .map(child => ({
                                        ...child,
                                        itemStyle: { color: sectorColors[child.name] },
                                        label: {color: '#333'}
                                      }));

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.name}: ${params.value}`;
        }
      },
      series: [{
        type: 'treemap',
        data: filteredChartData,
        roam: false,
        breadcrumb: {
          show: false
        },
        label: {
          show: true,
          // color: '#333',
        },
        itemStyle: {
          borderColor: 'transparent',
          borderWidth: 0,
          gapWidth: 0
        }
      }]

    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data, visibleSectors, sectorColors]);

  const toggleSectorVisibility = sector => {
    setVisibleSectors(prev => prev.includes(sector)
      ? prev.filter(s => s !== sector)
      : [...prev, sector]);
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '-10px', marginTop: '10px', justifyContent: 'center' }}>
        {data.children.map((child, index) => (
          <button
            key={index}
            onClick={() => toggleSectorVisibility(child.name)}
            style={{
              margin: '0 5px',
              padding: '0px 0px',
              backgroundColor: 'transparent',
              color: '#333',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            <div style={{
              width: '25px',
              height: '14px',
              backgroundColor: visibleSectors.includes(child.name) ? sectorColors[child.name] : '#ccc',
              marginRight: '8px',
              borderRadius: '5px'
            }} />
            {child.name}
          </button>
        ))}
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '800px' }} />
    </div>
  );
};
