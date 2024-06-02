import { useMemo } from 'react';
import { groupAssetsForPiechart } from '@/utils/data-helpers/groupAssetsForPiechart';

export const usePieChartDataByTickerAndCategory = (assets) => {
  return useMemo(() => {
    return groupAssetsForPiechart(assets, 'category', 'total_today_brl');
  }, [assets]);
};