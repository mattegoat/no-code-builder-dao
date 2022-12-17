/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import {
  NounsBuilderGovernorProposalCreatedEventProperties,
  RootQuery,
} from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_PROPOSALS_QUERY } from '@dao-auction/data/daoProposalsQuery'

export function useProposals({
  collectionAddress,
}: {
  collectionAddress: string | undefined
}) {
  const { data, error } = useSWR<RootQuery>(`dao-proposals`, async () =>
    zoraApiFetcher(DAO_PROPOSALS_QUERY, {
      collectionAddress: [collectionAddress],
    })
  )

  const proposals = data?.nouns.nounsEvents.nodes.map(
    (n) => n.properties.properties as NounsBuilderGovernorProposalCreatedEventProperties
  )

  const transaction = data?.nouns.nounsEvents.nodes.map((n) => n.transactionInfo)

  return {
    proposals,
    transaction,
    error,
  }
}
