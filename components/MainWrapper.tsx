// components/MainWrapper.tsx
import React from "react";
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/providers/wagmiConfig';

const queryClient = new QueryClient();

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
};

export default MainWrapper;
