import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [ base ],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      // [sepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}


// import { http, createConfig } from 'wagmi';
// import { base } from 'wagmi/chains';
// import { coinbaseWallet } from 'wagmi/connectors';
 
// export function getConfig() {
//   return createConfig({
//     chains: [base],
//     multiInjectedProviderDiscovery: false,
//     connectors: [
//       coinbaseWallet({
//         appName: 'miniminds',
//         preference: 'smartWalletOnly', 
//         version: '4',
//       }),
//     ],
//     ssr: true,
//     transports: {
//       [base.id]: http(),
//     },
//   });
// }