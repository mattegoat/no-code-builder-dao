import { DAO_ADDRESS } from '@dao-auction/config'
import { ethers } from 'ethers'

export type TDao = {
  name?: string | null
  collectionAddress: string
  auctionAddress: string
  governorAddress: string
  metadataAddress: string
  description?: string | null
  symbol?: string | null
  totalSupply?: number | null
  treasuryAddress: string | null
  contractAddress?: string | null
  error?: any
}

export type TDaoContext = {
  daoInfo: TDao
}

export const DAO_PROVIDER_INITIAL_STATE: TDaoContext = {
  daoInfo: {
    governorAddress: ethers.constants.AddressZero,
    auctionAddress: ethers.constants.AddressZero,
    metadataAddress: ethers.constants.AddressZero,
    treasuryAddress: ethers.constants.AddressZero,
    collectionAddress: DAO_ADDRESS,
  } as TDao,
}
