import React from 'react';
import MainLayout from '@/layouts/dashboard/MainLayout';
import { Typography, Box } from '@mui/material';
import {
    DjangoDisconnected,
    DjangoAndMetamaskDisconnected,
    DjangoAndMetamaskConnected,
    MetamaskConnectedAndDjangoDisconnected,
    IntegratedLoginButton,
    IntegratedLogoutButton,
} from '@/components/auth';


export default function Dashboard() {
    return (
        <MainLayout>
            <Box borderBottom={1} borderColor="divider" mb={2} mt={2}>
                <Typography variant="h5" gutterBottom>Dashboard</Typography> {/* Usando h5 para fonte um pouco menor */}
            </Box>
            <div>   
                <DjangoAndMetamaskDisconnected>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'normal', mb: 2 }}>
                        Clique para acessar aos recursos do nosso app.
                    </Typography>
                </DjangoAndMetamaskDisconnected>
                <DjangoDisconnected>
                    <IntegratedLoginButton />
                </DjangoDisconnected>
                <MetamaskConnectedAndDjangoDisconnected>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'normal', mb: 2 }}>
                        Confirme sua identidade usando a Metamask, é grátis.
                    </Typography>
                </MetamaskConnectedAndDjangoDisconnected>
                <DjangoAndMetamaskConnected>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'normal', mb: 2 }}>
                        Aqui vai o conteúdo do dashboard.
                    </Typography>

                    <IntegratedLogoutButton />
                </DjangoAndMetamaskConnected>
            </div>
        </MainLayout>
    );
}
