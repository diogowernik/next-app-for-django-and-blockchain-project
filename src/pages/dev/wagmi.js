// @/pages/dex/my-wallets.js

import React from 'react';
import MainLayout from "@/layouts/dex/dashboard/MainLayout";
import dynamic from 'next/dynamic';
import { Divider, Typography } from '@mui/material';
import WalletsCardsFiat from '@/components/arquivo/WalletsCardsFiat';
import WalletsCardsWtree from '@/components/arquivo/WalletsCardsWtree';
import WalletsCardsBTC from '@/components/wallets/arquivo/WalletsCardsBTC';

// Importação dinâmica do componente WalletsCardsEVM com SSR desativado
const WalletsCardsEVM = dynamic(
  () => import('@/components/arquivo/WalletsCardsEVM'),
  { ssr: false } // Desativa o Server-Side Rendering para este componente
);

const MyWalletsPage = () => {
    return (
        <MainLayout>
            <Typography variant="h6" gutterBottom>
                Carteiras EVM
            </Typography>
            <WalletsCardsEVM />
        </MainLayout>
    );
};

export default MyWalletsPage;
