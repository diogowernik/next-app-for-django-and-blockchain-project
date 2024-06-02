import { useMemo } from 'react';
import { groupAssetsForTreemap } from '@/utils/data-helpers/groupAssetsForTreemap'; // Ajuste o caminho conforme necessário

export const useTreemapDataByTickerAndSubcategory = (assets) => {
  return useMemo(() => {
    const data = {
      name: 'portfolio',
      children: groupAssetsForTreemap(assets, 'subcategory')
    };
    return data;
  }, [assets]);
};