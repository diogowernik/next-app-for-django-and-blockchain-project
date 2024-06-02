import { useMemo } from 'react';
import { groupAssetsForPiechart } from '@/utils/data-helpers/groupAssetsForPiechart';

export const usePieChartDataByTickerAndSubcategory = (assets) => {
    return useMemo(() => {
      return groupAssetsForPiechart(assets, 'subcategory', 'total_today_brl');
    }, [assets]);
  };