import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createClient, chain, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { infuraProvider } from 'wagmi/providers/infura'
import { SWRConfig } from 'swr'
import '@rainbow-me/rainbowkit/styles.css'
import DaoProvider from 'context/DaoProvider/provider'

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    infuraProvider({
      priority: 0,
      apiKey: process.env.NEXT_PUBLIC_INFURA_KEY,
    }),
    jsonRpcProvider({
      priority: 1,
      rpc: (chain) =>
        chain.id === 1
          ? { http: 'https://rpc.ankr.com/eth' }
          : { http: 'https://rpc.ankr.com/eth_goerli' },
    }),
    publicProvider({ priority: 2 }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Nounsite Builder',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function AppWrapper({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          <NextNProgress
            color="rgba(0,0,0,.5)"
            startPosition={0.125}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <DaoProvider>{children}</DaoProvider>
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
