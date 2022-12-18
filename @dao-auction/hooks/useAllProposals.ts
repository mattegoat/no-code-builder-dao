/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import {
  NounsBuilderGovernorProposalCreatedEventProperties,
  RootQuery,
} from '../types/zora.api.generated'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { DAO_PROPOSALS_QUERY } from '@dao-auction/data/daoProposalsQuery'
import { ProposalData, ProposalDetail, ProposalState } from '@dao-auction/types/proposal'
import { useDeepCompareCallback } from 'use-deep-compare'
import { useDao } from 'context/DaoProvider'
import { ethers, utils } from 'ethers'
import { useContractRead, useContractReads, useProvider } from 'wagmi'
import { DAO_ADDRESS } from '@dao-auction/config'
import GovernorABI from '../lib/abi/Governor.json'
// import * as R from 'ramda'

export function useProposals({
  collectionAddress,
}: {
  collectionAddress: string | undefined
}) {
  const [isFetching, setIsFetching] = React.useState(false)
  const [status, setStatus] = React.useState<ProposalState[] | null>(null)
  const [isFetchingInfo, setIsFetchingInfo] = React.useState(false)
  const [proposalInfo, setProposalInfo] = React.useState<any[] | null>(null)

  const { daoInfo } = useDao()

  const provider = useProvider()

  const { data, error } = useSWR<RootQuery>(`dao-proposals`, async () =>
    zoraApiFetcher(DAO_PROPOSALS_QUERY, {
      collectionAddress: [collectionAddress],
    })
  )

  const proposals =
    data?.nouns.nounsEvents.nodes.map(
      (n) => n.properties.properties as NounsBuilderGovernorProposalCreatedEventProperties
    ) || []

  const transactions = data?.nouns.nounsEvents.nodes.map((n) => n.transactionInfo) || []

  const updateProposalsStatus = useDeepCompareCallback(async () => {
    if (!proposals) return
    setIsFetching(true)
    try {
      const _statuses = await Promise.all(
        proposals.map(async (p) => {
          const _contract = new ethers.Contract(
            daoInfo.governorAddress || ethers.constants.AddressZero,
            governorABI,
            provider
          )
          const result = await _contract.state(p.proposalId.valueOf())
          return result
        })
      )
      setStatus(_statuses)
      setIsFetching(false)
    } catch (error) {
      console.error(error)
      setStatus(null)
      setIsFetching(false)
    }
  }, [proposals, daoInfo])

  const updateProposalInfo = useDeepCompareCallback(async () => {
    if (!proposals) return
    setIsFetchingInfo(true)
    try {
      const _info = await Promise.all(
        proposals.map(async (p) => {
          const _contract = new ethers.Contract(
            daoInfo.governorAddress || ethers.constants.AddressZero,
            governorABI,
            provider
          )
          const result = await _contract.getProposal(p.proposalId.valueOf())
          return result
        })
      )
      setProposalInfo(_info)
      setIsFetchingInfo(false)
    } catch (error) {
      console.error(error)
      setProposalInfo(null)
      setIsFetchingInfo(false)
    }
  }, [proposals, daoInfo])

  React.useEffect(() => {
    updateProposalsStatus()
  }, [collectionAddress, updateProposalsStatus])

  React.useEffect(() => {
    updateProposalInfo()
  }, [collectionAddress, updateProposalInfo])

  return {
    transactions: transactions,
    details: proposals,
    status,
    proposals: proposalInfo,
    error,
    loading: isFetching || isFetchingInfo,
  }
}

const hashRegex = /^\s*#{1,6}\s+([^\n]+)/
const equalTitleRegex = /^\s*([^\n]+)\n(={3,25}|-{3,25})/

/**
 * Extract a markdown title from a proposal body that uses the `# Title` format
 * Returns null if no title found.
 */
const extractHashTitle = (body: string) => body.match(hashRegex)
/**
 * Extract a markdown title from a proposal body that uses the `Title\n===` format.
 * Returns null if no title found.
 */
const extractEqualTitle = (body: string) => body.match(equalTitleRegex)

/**
 * Extract title from a proposal's body/description. Returns null if no title found in the first line.
 * @param body proposal body
 */
const extractTitle = (body: string | undefined): string | null => {
  if (!body) return null
  const hashResult = extractHashTitle(body)
  const equalResult = extractEqualTitle(body)
  return hashResult ? hashResult[1] : equalResult ? equalResult[1] : null
}

const removeBold = (text: string | null): string | null =>
  text ? text.replace(/\*\*/g, '') : text
const removeItalics = (text: string | null): string | null =>
  text ? text.replace(/__/g, '') : text

export const governorABI = new utils.Interface(GovernorABI)

const useVotingDelay = (governorAddress: string): number | undefined => {
  const { data: blockDelay } =
    useContractRead({
      addressOrName: governorAddress,
      contractInterface: governorABI,
      functionName: 'votingDelay',
      args: [],
    }) || []
  return blockDelay?.toNumber()
}

export const useProposalIds = (): string[] => {
  const { data, error } = useSWR<RootQuery>(`dao-proposals-count`, async () =>
    zoraApiFetcher(DAO_PROPOSALS_QUERY, {
      collectionAddress: [DAO_ADDRESS],
    })
  )

  return React.useMemo(
    () =>
      data?.nouns.nounsEvents.nodes.map(
        (n) =>
          (n.properties.properties as NounsBuilderGovernorProposalCreatedEventProperties)
            .proposalId
      ) || [],
    [data?.nouns.nounsEvents.nodes]
  )
}

const countToIndices = (count: number | undefined) => {
  return typeof count === 'number' ? new Array(count).fill(0).map((_, i) => [i + 1]) : []
}

const proposals: any[] = []
const proposalStates: any[] = []

export const useAllProposalsViaChain = ({
  governorAddress,
}: {
  governorAddress: string
}): ProposalData => {
  const proposalIds = useProposalIds()
  // const votingDelay = useVotingDelay(governorAddress)

  const formattedLogs = useProposals({ collectionAddress: DAO_ADDRESS })

  React.useEffect(() => console.log(formattedLogs), [formattedLogs])

  // Early return until events are fetched
  return React.useMemo(() => {
    const logs = formattedLogs ?? []
    if (proposalIds.length === 0 || (proposals.length && !logs.transactions?.length)) {
      return { data: [], loading: true }
    }

    return {
      data: proposals?.map((p, i) => {
        const proposal = p?.[0]
        const description: string = logs.details[i]?.description?.replace(/\\n/g, '\n')
        return {
          id: logs.details[i]?.proposalId.toString(),
          title: extractTitle(description) ?? 'Untitled',
          description: description ?? 'No description.',
          proposer: proposal?.proposer,
          status: proposalStates[i]?.[0] ?? ProposalState.UNDETERMINED,
          proposalThreshold: parseInt(proposal?.proposalThreshold?.toString() ?? '0'),
          quorumVotes: parseInt(proposal?.quorumVotes?.toString() ?? '0'),
          forCount: parseInt(proposal?.forVotes?.toString() ?? '0'),
          againstCount: parseInt(proposal?.againstVotes?.toString() ?? '0'),
          abstainCount: parseInt(proposal?.abstainVotes?.toString() ?? '0'),
          startVote: parseInt(proposal?.startVote?.toString() ?? ''),
          eta: proposal?.endVote
            ? new Date(proposal?.endVote?.toNumber() * 1000)
            : undefined,
          details: logs.details[i].targets.map((target, j) => {
            return {
              target,
              value: logs.details[i].values[j],
              callData: logs.details[i].calldatas[j],
              functionSig: '',
            } as ProposalDetail
          }),
          transactionHash: logs.transactions[i]?.transactionHash || '',
        }
      }),
      loading: false,
    }
  }, [formattedLogs])
}
