import { useMemo } from 'react';
import { groupBy, sumBy } from 'lodash';

export const useYearlyDividends = (dividends) => {
  return useMemo(() => {
    const groupedByYear = groupBy(dividends, (d) => new Date(d.pay_date).getFullYear());
    const result = Object.keys(groupedByYear).map((year) => {
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const dividendsInMonth = groupedByYear[year].filter((d) => new Date(d.pay_date).getMonth() + 1 === month);
        return sumBy(dividendsInMonth, 'total_dividend_brl');
      });
      const total = sumBy(groupedByYear[year], 'total_dividend_brl');
      return { year, months, total };
    });
    return result;
  }, [dividends]);
};
