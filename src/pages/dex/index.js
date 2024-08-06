import React, { useState } from 'react';
import { DexLayout } from '@/layouts/dex/DexLayout';
import { WalletsDashboard } from '@/components/dex/WalletsDashboard';
import { DexDashboard } from '@/components/dex/DexDashboard';
import { CreateProfileDashboard } from '@/components/dex/CreateProfileDashboard';
// import { SettingsComponent } from '@/components/dex/SettingsComponent';
// import { AnalyticsComponent } from '@/components/dex/AnalyticsComponent';
// import { ReceivedDonationsComponent } from '@/components/dex/ReceivedDonationsComponent';
// import { SentDonationsComponent } from '@/components/dex/SentDonationsComponent';

import { useDexUrlChange } from '@/hooks/urls/useDexUrlChange';

const DexPage = () => {
    const [activeDashboard, handleDashboardChange] = useDexUrlChange();

    const renderDashboard = () => {
        switch (activeDashboard) {
            case 'dashboard':
                return <DexDashboard handleDashboardChange={handleDashboardChange} />;
            case 'wallets':
                return <WalletsDashboard />;
            case 'create-profile':
                return <CreateProfileDashboard />;
            // case 'settings':
            //     return <SettingsComponent />;
            // case 'analytics':
            //     return <AnalyticsComponent />;
            // case 'receivedDonations':
            //     return <ReceivedDonationsComponent />;
            // case 'sentDonations':
            //     return <SentDonationsComponent />;
            default:
                return <WalletsDashboard />;
        }
    };

    return (
        <DexLayout handleDashboardChange={handleDashboardChange}>
            {renderDashboard()}
        </DexLayout>
    );
};

export default DexPage;
