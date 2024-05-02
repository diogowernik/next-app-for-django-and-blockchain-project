import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  MetaMaskConnected,
  MetaMaskDisconnected,
  DjangoConnected,
  DjangoDisconnected,
  DjangoAndMetamaskDisconnected,
  DjangoAndMetamaskConnected,
  MetamaskConnectedAndDjangoDisconnected,
} from '@/components';
import IntegratedLoginButton from '@/components/auth/buttons/IntegratedLoginButton';
import IntegratedLogoutButton from '@/components/auth/buttons/IntegratedLogoutButton';
import CreateProfilePage from '@/components/CreateProfilePage';

export default function Dashboard() {
    return (
        <MainLayout>
            <h1>Dashboard</h1>
            
            <div>   
                <DjangoAndMetamaskDisconnected>
                    <p>Clique para acessar aos recursos do nosso app.</p>
                </DjangoAndMetamaskDisconnected>
                <DjangoDisconnected>
                    <IntegratedLoginButton />
                </DjangoDisconnected>
                <MetamaskConnectedAndDjangoDisconnected>
                    <p>Confirme sua identidade usando a Metamask, é grátis.</p>
                </MetamaskConnectedAndDjangoDisconnected>
                <DjangoAndMetamaskConnected>
                    <CreateProfilePage />
   
    <IntegratedLogoutButton />

                </DjangoAndMetamaskConnected>

            </div>
        </MainLayout>
    );
}
