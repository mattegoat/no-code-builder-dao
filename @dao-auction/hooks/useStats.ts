/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { AggStatQuery } from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_STATS_QUERY } from '@dao-auction/data/daoStatsQuery'

export function useStats({
  collectionAddress,
}: {
  collectionAddress: string | undefined
}) {
  const { data, error } = useSWR<AggStatQuery>(`dao-stats`, async () =>
    zoraApiFetcher(DAO_STATS_QUERY, {
      collectionAddress: [collectionAddress],
    })
  )

  const ownerCount = React.useMemo(() => data?.aggregateStat.ownerCount, [data])

  return {
    ownerCount,
    error,
  }
}
