/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import {
  NounsBuilderGovernorProposalCreatedEventProperties,
  RootQuery,
} from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_PROPOSALS_QUERY } from '@dao-auction/data/daoProposalsQuery'
import { useNounsProtocol } from './useNounsProtocol'
import { ProposalState } from '@dao-auction/types/proposal'
import { useDeepCompareCallback } from 'use-deep-compare'
import { useDao } from 'context/DaoProvider'
import { ethers } from 'ethers'

export function useProposals({
  collectionAddress,
}: {
  collectionAddress: string | undefined
}) {
  const [isFetching, setIsFetching] = React.useState(false)
  const [status, setStatus] = React.useState<ProposalState[] | null>(null)

  const { daoInfo } = useDao()

  const { BuilderGovernor } = useNounsProtocol({
    governorAddress: daoInfo.governorAddress || ethers.constants.AddressZero,
  })

  const { data, error } = useSWR<RootQuery>(`dao-proposals`, async () =>
    zoraApiFetcher(DAO_PROPOSALS_QUERY, {
      collectionAddress: [collectionAddress],
    })
  )

  const proposals = data?.nouns.nounsEvents.nodes.map(
    (n) => n.properties.properties as NounsBuilderGovernorProposalCreatedEventProperties
  )

  const transaction = data?.nouns.nounsEvents.nodes.map((n) => n.transactionInfo)

  const updateProposalsStatus = useDeepCompareCallback(async () => {
    if (!proposals) return
    setIsFetching(true)
    try {
      const _statuses = await Promise.all(
        proposals.map(async (p) => {
          const _id = ethers.utils.hexZeroPad(ethers.utils.hexlify(p.proposalId), 32)
          console.log(_id)
          console.log(await BuilderGovernor?.proposalEta(_id))
          const _state: ProposalState = (await BuilderGovernor?.proposalEta(_id)) || -1
          return _state
        })
      )
      setStatus(_statuses)
      setIsFetching(false)
    } catch (error) {
      console.error(error)
      setStatus(null)
      setIsFetching(false)
    }
  }, [proposals, BuilderGovernor])

  React.useEffect(() => {
    updateProposalsStatus()
  }, [collectionAddress, updateProposalsStatus])

  return {
    proposals,
    status,
    transaction,
    isFetching,
    error,
  }
}
