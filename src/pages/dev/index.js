import React from 'react';
import {
  MetaMaskConnectButton,
  MetaMaskSignOutButton,
  DjangoLoginButton,
  MetaMaskConnected,
  MetaMaskDisconnected,
  DjangoConnected,
  DjangoDisconnected,
  DjangoLogoutButton,
  DjangoAndMetamaskDisconnected,
  DjangoAndMetamaskConnected,
} from '@/components/auth';

import MainLayout from '@/layouts/dex/dashboard/MainLayout';


export default function Dashboard() {
    return (
        <MainLayout>
            <h1>Dashboard</h1>
            <div>
                <h2>MetaMask Status</h2>
                <MetaMaskConnected>
                    <p>Conectado ao MetaMask. Aqui você pode gerenciar suas interações com a blockchain.</p>
                    <MetaMaskSignOutButton />
                </MetaMaskConnected>
                <MetaMaskDisconnected>
                    <MetaMaskConnectButton />
                </MetaMaskDisconnected>
            </div>
            <div>
                <h2>Django Status</h2>
                <DjangoConnected>
                    <p>Conectado ao Django. Você pode acessar recursos protegidos.</p>
                    <DjangoLogoutButton />
                </DjangoConnected>
                <DjangoDisconnected>
                    <p>Não conectado ao Django. Faça login ou registre-se para continuar.</p>
                    {/* <DjangoRegisterButton />  deprecated */}
                    <DjangoLoginButton />
                </DjangoDisconnected>
            </div>
            <div>
                <h2>Conexão Rápida</h2>
                <DjangoDisconnected>
                <p>Conecte-se ao MetaMask e faça login no Django com um único clique.</p>
                {/* <IntegratedLoginButton /> */}
                </DjangoDisconnected>
                <DjangoAndMetamaskConnected>
                <p>Você está conectado ao MetaMask e ao Django.</p>
                {/* <IntegratedLogoutButton /> */}
                </DjangoAndMetamaskConnected>
                <DjangoAndMetamaskDisconnected>
                <p>Você não está conectado ao MetaMask e ao Django.</p>
                </DjangoAndMetamaskDisconnected>
            </div>
        </MainLayout>
    );
}