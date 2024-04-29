import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  MetaMaskConnectButton,
  MetaMaskSignOutButton,
  DjangoRegisterButton,
  DjangoLoginButton,
  MetaMaskConnected,
  MetaMaskDisconnected,
  DjangoConnected,
  DjangoDisconnected,
  DjangoLogoutButton,
  DjangoAndMetamaskDisconnected,
  DjangoAndMetamaskConnected,
} from '@/components';
import IntegratedLoginButton from '@/components/auth/buttons/IntegratedLoginButton';
import IntegratedLogoutButton from '@/components/auth/buttons/IntegratedLogoutButton';

export default function Dashboard() {
    return (
        <MainLayout>
            <h1>Dashboard</h1>
            <div>
                <h2>MetaMask Status</h2>
                <MetaMaskConnected>
                    <p>Conectado ao MetaMask. Aqui você pode gerenciar suas interações com a blockchain.</p>
                </MetaMaskConnected>
                <MetaMaskDisconnected>
                    <p> Não conectado ao MetaMask. Conecte-se para continuar.</p>
                </MetaMaskDisconnected>
            </div>
            <div>
                <h2>Django Status</h2>
                <DjangoConnected>
                    <p>Conectado ao Django. Você pode acessar recursos protegidos.</p>
                </DjangoConnected>
                <DjangoDisconnected>
                    <p>Não conectado ao Django. Conecte-se para continuar.</p>
                </DjangoDisconnected>
            </div>
            <div>
                <h2>Conexão Rápida</h2>
                <DjangoDisconnected>
                    <p>Conecte-se ao MetaMask e ao Django com um único clique.</p>
                    <IntegratedLoginButton />
                </DjangoDisconnected>
                <DjangoAndMetamaskConnected>
                <p>Você está conectado ao MetaMask e ao Django.</p>
                <IntegratedLogoutButton />
                </DjangoAndMetamaskConnected>
                <DjangoAndMetamaskDisconnected>
                <p>Você não está conectado ao MetaMask nem ao Django.</p>
                </DjangoAndMetamaskDisconnected>
            </div>
        </MainLayout>
    );
}
