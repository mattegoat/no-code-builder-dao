/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import {
  NounsBuilderAuctionAuctionBidEventProperties,
  RootQuery,
} from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_AUCTION_BIDS_QUERY } from '@dao-auction/data/daoAuctionBidsQuery'

export function useAuctionBids({
  collectionAddress,
  tokenId,
}: {
  collectionAddress: string
  tokenId: string
}) {
  const { data, error } = useSWR<RootQuery>(`bids-auctions`, async () =>
    zoraApiFetcher(DAO_AUCTION_BIDS_QUERY, {
      collectionAddress: [collectionAddress],
    })
  )

  const bids = data?.nouns.nounsEvents?.nodes.filter(
    (n) =>
      (n.properties.properties as NounsBuilderAuctionAuctionBidEventProperties)
        .tokenId === tokenId
  )

  return {
    bids,
    error,
  }
}
