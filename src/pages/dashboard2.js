import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  MetaMaskConnectButton,
  MetaMaskSignOutButton,
  DjangoRegisterButton,
  DjangoLoginButton,
  MetamaskDjangoIntegratedLogin,
  MetaMaskConnected,
  MetaMaskDisconnected,
  DjangoConnected,
  DjangoDisconnected,
  DjangoLogoutButton
} from '@/components';

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
                    <DjangoRegisterButton />
                    <DjangoLoginButton />
                </DjangoDisconnected>
            </div>
            <div>
                <h2>Conexão Rápida</h2>
                <MetaMaskDisconnected>
                    <MetamaskDjangoIntegratedLogin />
                </MetaMaskDisconnected>
            </div>
        </MainLayout>
    );
}
