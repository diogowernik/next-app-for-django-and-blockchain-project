import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useTreemapData } from '@/hooks/data/useTreemapData'; 


export const PortfolioAssetsTreemap = ({ assets, filterKey, Filter }) => {
  const treemapDataByCategory = useTreemapData(assets, 'category', 'total_today_brl');
  const treemapDataBySubcategory = useTreemapData(assets, 'subcategory', 'total_today_brl');

  const treemapData = (filterKey === 'broker' || Filter === '') ? treemapDataByCategory : treemapDataBySubcategory;

  return (
    <TreemapComponent data={treemapData} />
  );
};



// Define a palette of colors
const colorPalette = [
  '#5470C6', '#91CC75', '#FAC858', 
  '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', 
  '#ea7ccc', '#007B83', '#7f6d93', '#3e1929'
];

// Function to determine if the color is dark
function isColorDark(color) {
  const rgb = parseInt(color.slice(1), 16); // convert hex to RGB
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 186; // brightness threshold for light/dark
}

export const TreemapComponent = ({ data }) => {
  const chartRef = useRef(null);
  const [visibleSectors, setVisibleSectors] = useState([]);
  const [sectorColors, setSectorColors] = useState({});

  // Update initial colors for each sector using the color palette
  useEffect(() => {
    const initialColors = {};
    data.children.forEach((child, index) => {
      initialColors[child.name] = colorPalette[index % colorPalette.length]; // Cycle through the color palette
    });
    setSectorColors(initialColors);
    setVisibleSectors(data.children.map(child => child.name));
  }, [data]);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const filteredChartData = data.children.filter(child => visibleSectors.includes(child.name))
                                      .map(child => ({
                                        ...child,
                                        itemStyle: {
                                          color: sectorColors[child.name],
                                          borderColor: 'transparent',
                                          borderWidth: 0,
                                          gapWidth: 0
                                        },
                                        label: {
                                          show: true,
                                          color: isColorDark(sectorColors[child.name]) ? '#FFF' : '#000' // Dynamic label color based on background
                                        }
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
