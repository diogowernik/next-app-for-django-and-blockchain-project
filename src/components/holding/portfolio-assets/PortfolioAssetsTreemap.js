import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useTreemapData } from '@/hooks/data/useTreemapData'; 


export const PortfolioAssetsTreemap = ({ assets, categoryFilter }) => {
  const treemapDataByCategory = useTreemapData(assets, 'category', 'total_today_brl');
  const treemapDataBySubcategory = useTreemapData(assets, 'subcategory', 'total_today_brl');

  // Escolha o conjunto de dados baseado no filtro de categoria
  const treemapData = categoryFilter === '' ? treemapDataByCategory : treemapDataBySubcategory;

  return (
    <TreemapComponent data={treemapData} />
  );
}

export const TreemapComponent = ({ data }) => {
  const chartRef = useRef(null);
  const [visibleSectors, setVisibleSectors] = useState([]);

  // Atualiza visibleSectors sempre que os dados mudam
  useEffect(() => {
    setVisibleSectors(data.children.map(child => child.name));
  }, [data]);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Filtrar dados baseados nos setores visíveis
    const filteredChartData = data.children.filter(child => visibleSectors.includes(child.name))
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
        data: filteredChartData,
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

  const toggleSectorVisibility = sector => {
    setVisibleSectors(prev => prev.includes(sector)
      ? prev.filter(s => s !== sector)
      : [...prev, sector]);
  };

  return (
    <div>
      {/* // centralizar */}
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
              backgroundColor: visibleSectors.includes(child.name) ? colorMap[child.name] : '#ccc',
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

// Definição das cores de cada setor
const colorMap = {
  'Propriedades': '#0057B8', // Azul
  'Criptomoedas': '#4CAF50', // Verde
  'Fundos Imobiliários': '#FF7043', // Laranja
  'Ações Brasileiras': '#FFC107', // Amarelo
  'Stocks': '#9C27B0', // Roxo
  'ETFs': '#00BCD4', // Ciano
  'Caixa Internacional': '#673AB7', // Roxo mais escuro
  'Caixa': '#607D8B', // Azul cinza (Blue Grey)
  // Adicione mais categorias conforme necessário
};


