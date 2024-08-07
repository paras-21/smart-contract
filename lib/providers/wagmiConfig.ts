// lib/providers/wagmiConfig.ts
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Define your Ganache chain
const ganacheChain = {
  id: 1337,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://localhost:7545'] },
    public: { http: ['http://localhost:7545'] },
  },
  blockExplorers: {
    default: { name: 'Ganache', url: 'http://localhost:7545' },
  },
  testnet: true,
}

export const config = createConfig({
  chains: [ganacheChain, mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [ganacheChain.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
