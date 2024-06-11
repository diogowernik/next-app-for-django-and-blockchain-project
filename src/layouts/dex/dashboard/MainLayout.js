// @layouts/MainLayout.js

import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import { WagmiProvider } from "wagmi";
import { wtreeWagmiConfig } from "@/config/wtreeWagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Criar o cliente do QueryClient uma única vez e reutilizá-lo evita recriações desnecessárias e potenciais problemas de performance.
const queryClient = new QueryClient();

const MainLayout = ({ children }) => {
  return (
    <WagmiProvider config={wtreeWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ResponsiveDrawer>
          {children} 
        </ResponsiveDrawer>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default MainLayout;
