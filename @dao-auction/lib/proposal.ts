import { ProposalState } from '@dao-auction/types/proposal'

export const getProposalStatus = (status?: ProposalState): string => {
  switch (status) {
    case ProposalState.SUCCEEDED:
    case ProposalState.EXECUTED:
    case ProposalState.QUEUED:
      return 'success'
    case ProposalState.DEFEATED:
    case ProposalState.VETOED:
      return 'failure'
    default:
      return 'pending'
  }
}
