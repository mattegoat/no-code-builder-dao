import { ChainId } from '@usedapp/core'
import { ethers } from 'ethers'
import Config from '../config/config.json'

interface ExternalContractAddresses {
  lidoToken: string | undefined
  usdcToken: string | undefined
  chainlinkEthUsdc: string | undefined
  payerContract: string | undefined
  tokenBuyer: string | undefined
}

interface AppConfig {
  jsonRpcUri: string
  wsRpcUri: string
  subgraphApiUri: string
  enableHistory: boolean
}

type SupportedChains =
  | ChainId.Rinkeby
  | ChainId.Mainnet
  | ChainId.Hardhat
  | ChainId.Goerli

interface CacheBucket {
  name: string
  version: string
}

export const cache: Record<string, CacheBucket> = {
  seed: {
    name: 'seed',
    version: 'v1',
  },
  ens: {
    name: 'ens',
    version: 'v1',
  },
}

export const cacheKey = (bucket: CacheBucket, ...parts: (string | number)[]) => {
  return [bucket.name, bucket.version, ...parts].join('-').toLowerCase()
}

export const CHAIN_ID: SupportedChains = parseInt(Config.chainId ?? '4')

export const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY ?? ''

export const DAO_ADDRESS = Config.address ?? ethers.constants.AddressZero

const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID

export const ADMIN_ADDRESS = Config.adminAddress ?? ethers.constants.AddressZero

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`NEXT_PUBLIC_${network.toUpperCase()}_JSONRPC`]
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`
}

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`NEXT_PUBLIC_${network.toUpperCase()}_WSRPC`]
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`
}

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri:
      'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v5',
    enableHistory: process.env.NEXT_PUBLIC_ENABLE_HISTORY === 'true',
  },
  [ChainId.Goerli]: {
    jsonRpcUri: createNetworkHttpUrl('goerli'),
    wsRpcUri: createNetworkWsUrl('goerli'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/bcjgit/dao-v2-test',
    enableHistory: process.env.NEXT_PUBLIC_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.NEXT_PUBLIC_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://localhost:8000/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.NEXT_PUBLIC_ENABLE_HISTORY === 'true',
  },
}

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [ChainId.Rinkeby]: {
    lidoToken: '0xF4242f9d78DB7218Ad72Ee3aE14469DBDE8731eD',
    usdcToken: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
  },
  [ChainId.Goerli]: {
    lidoToken: '0x2DD6530F136D2B56330792D46aF959D9EA62E276',
    usdcToken: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    payerContract: '0xD4A3bf1dF54699E63A2ef7F490E8E22b27B945f0',
    tokenBuyer: '0x61Ec4584c5B5eBaaD9f21Aac491fBB5B2ff30779',
    chainlinkEthUsdc: undefined,
  },
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    usdcToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chainlinkEthUsdc: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    payerContract: '0xd97Bcd9f47cEe35c0a9ec1dc40C1269afc9E8E1D',
    tokenBuyer: '0x4f2aCdc74f6941390d9b1804faBc3E780388cfe5',
  },
  [ChainId.Hardhat]: {
    lidoToken: undefined,
    usdcToken: undefined,
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
  },
}

const config = {
  app: app[CHAIN_ID],
  addresses: { ...externalAddresses[CHAIN_ID] },
}

export default config

export const multicallOnLocalhost = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'
