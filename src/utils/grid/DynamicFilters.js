import React from 'react';
import { TextField } from '@mui/material';

export function DynamicFilters({ filters, setFilters }) {
  return (
    <>
      {Object.keys(filters).map((key) => (
        <TextField
          key={key}
          label={`Filter by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
          variant="outlined"
          value={filters[key]}
          onChange={e => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
          style={{ margin: '0 10px 10px 0'}}
        />
      ))}
    </>
  );
}

