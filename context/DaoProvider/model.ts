export type TDao = {
  name?: string | null
  collectionAddress?: string | null
  auctionAddress?: string | null
  governorAddress?: string | null
  metadataAddress?: string | null
  description?: string | null
  symbol?: string | null
  totalSupply?: number | null
  treasuryAddress?: string | null
  contractAddress?: string | null
  error?: any
}

export type TDaoContext = {
  daoInfo: TDao
}

export const DAO_PROVIDER_INITIAL_STATE: TDaoContext = {
  daoInfo: {} as TDao,
}
