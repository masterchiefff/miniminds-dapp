import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [base],
    connectors: [
      injected(),
      coinbaseWallet({
        appName: 'miniminds', // Set the app name to Miniminds
      }),
      walletConnect({
        projectId: '8e9799aea33e1610e8a7eb7e67dc0ef6', // Use your project ID
      }),
      
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
    },
  });
}

// Extend the wagmi module to register your config
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
