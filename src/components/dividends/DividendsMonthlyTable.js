// @/components/dividends/DividendsMonthlyTable.js

import React from 'react';

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export const DividendsMonthlyTable = ({ items }) => (
  <table className="table table-striped table-sm">
    <thead>
      <tr>
        <th>Ano</th>
        {months.map((month) => (
          <th key={month}>{month}</th>
        ))}
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {items.map(({ year, months, total }) => (
        <tr key={year}>
          <td>{year}</td>
          {months.map((monthTotal, i) => (
            <td key={i}>{monthTotal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</td>
          ))}
          <td>{total.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DividendsMonthlyTable;
