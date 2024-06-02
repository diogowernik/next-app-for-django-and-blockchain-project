import React from 'react';
import { LeftSidebarWrapper } from '@/layouts/shared/LeftSidebarWrapper';
import { DataGridTotal } from '@/components/holding/sidebars/DataGridTotal';

const categoriesData = [
  { type: 'Equities', totalInvested: '50,000 USD' },
  { type: 'Bonds', totalInvested: '20,000 USD' }
];

const brokersData = [
  { type: 'Broker A', totalInvested: '30,000 USD' },
  { type: 'Broker B', totalInvested: '40,000 USD' }
];

const subcategoriesData = [
  { type: 'Tech Stocks', totalInvested: '25,000 USD' },
  { type: 'Green Bonds', totalInvested: '15,000 USD' }
];

export const LeftSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <LeftSidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar} width={360}>
            <DataGridTotal title="Total Invested by Category" data={categoriesData} />
            <DataGridTotal title="Total Invested by Broker" data={brokersData} />
            <DataGridTotal title="Total Invested by Subcategory" data={subcategoriesData} />
        </LeftSidebarWrapper>
    );
};
