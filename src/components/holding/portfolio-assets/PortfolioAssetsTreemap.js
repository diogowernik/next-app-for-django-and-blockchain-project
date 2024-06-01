import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

export const TreemapComponent = ({ data }) => {
  const chartRef = useRef(null);
  // Estado para controlar quais setores estão visíveis
  const [visibleSectors, setVisibleSectors] = useState(data.children.map(child => child.name));

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Filtrar dados baseados nos setores visíveis
    const filteredData = data.children.filter(child => visibleSectors.includes(child.name))
                                      .map(child => ({
                                        ...child,
                                        itemStyle: { color: colorMap[child.name] }
                                      }));

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const { name, value } = params;
          return `${name}: ${value}`;
        }
      },
      series: [{
        type: 'treemap',
        data: filteredData,
        roam: false,
        breadcrumb: {
          show: false
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
  }, [data, visibleSectors]);

  // Função para alternar a visibilidade dos setores
  const toggleSectorVisibility = sector => {
    setVisibleSectors(prevVisibleSectors =>
      prevVisibleSectors.includes(sector)
      ? prevVisibleSectors.filter(s => s !== sector)
      : [...prevVisibleSectors, sector]
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
  {data.children.map((child, index) => (
    <button
      key={index}
      onClick={() => toggleSectorVisibility(child.name)}
      style={{
        margin: '0 5px',
        padding: '0px 0px',
        backgroundColor: 'transparent', // Fundo transparente
        color: '#333', // Cor do texto
        fontSize: '14px', // Tamanho da fonte menor
        border: 'none', // Sem borda
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }}>
      <div style={{
        width: '25px', // Largura do retângulo colorido
        height: '14px', // Altura do retângulo colorido
        backgroundColor: visibleSectors.includes(child.name) ? colorMap[child.name] : '#ccc', // Cor de fundo dinâmica
        marginRight: '8px', // Espaçamento entre o retângulo colorido e o texto
        // border rounded
        borderRadius: '5px'
      }} />
      {child.name}
    </button>
  ))}
   </div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

// Definição das cores de cada setor
const colorMap = {
  'Energia Elétrica': '#0057B8', // Azul
  'Químicos': '#4CAF50', // Verde
  // Adicione mais setores e suas respectivas cores aqui
};




export const PortfolioAssetsTreemap = () => {
  const treemapData = {
    name: 'portfolio',
    children: [
      {
        name: 'Energia Elétrica',
        children: [
          { name: 'TAEE11', value: 3000 },
          { name: 'EGIE3', value: 3000 }
        ]
      },
      {
        name: 'Químicos',
        children: [
          { name: 'UNIP6', value: 3000 }
        ]
      }
      // Adicione mais setores e empresas conforme necessário
    ]
  };

  return (
    <TreemapComponent data={treemapData} />
  );
};
