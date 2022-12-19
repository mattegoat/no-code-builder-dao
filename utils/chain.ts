import Config from '../config/config.json'

export const CHAIN_ID = Config.chainId as '1' | '5' | undefined

if (!CHAIN_ID) {
  throw new Error('ChainID is required.')
}
