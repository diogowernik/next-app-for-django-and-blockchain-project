import React from 'react';
import { useTreemapData } from '@/hooks/data/useTreemapData'; 
import { TreemapComponent } from '@/components/charts/TreemapComponent';


export const PortfolioAssetsTreemap = ({ assets, filterKey, Filter }) => {
  const treemapDataByCategory = useTreemapData(assets, 'category', 'total_today_brl');
  const treemapDataBySubcategory = useTreemapData(assets, 'subcategory', 'total_today_brl');

  const treemapData = (filterKey === 'broker' || Filter === '') ? treemapDataByCategory : treemapDataBySubcategory;

  return (
    <TreemapComponent data={treemapData} />
  );
};
