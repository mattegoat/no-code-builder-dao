/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { NounsDaosQuery } from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_ADDRESSES_QUERY } from '@dao-auction/data/daoAddressesQuery'

export function useAllAddresses({
  collectionAddress,
}: {
  collectionAddress: string | undefined
}) {
  const { data, error } = useSWR<NounsDaosQuery>(`dao-addresses`, async () =>
    zoraApiFetcher(DAO_ADDRESSES_QUERY, {
      daoAddress: [collectionAddress],
    })
  )

  const addresses = data?.nouns.nounsDaos.nodes[0]

  return {
    ...addresses,
    error,
  }
}
