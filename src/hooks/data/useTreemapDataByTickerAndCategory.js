import { useMemo } from 'react';
import { groupAssetsForTreemap } from '@/utils/data-helpers/groupAssetsForTreemap'; // Ajuste o caminho conforme necessário

export const useTreemapDataByTickerAndCategory = (assets) => {
  return useMemo(() => {
    const data = {
      name: 'portfolio',
      children: groupAssetsForTreemap(assets, 'category')
    };
    return data;
  }, [assets]);
};