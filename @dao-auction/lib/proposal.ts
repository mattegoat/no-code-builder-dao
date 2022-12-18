import { ProposalState } from '@dao-auction/types/proposal'

export const getProposalStatus = (status?: ProposalState): string => {
  switch (status) {
    case ProposalState.SUCCEEDED:
      return 'Succeeded'
    case ProposalState.EXECUTED:
      return 'Executed'
    case ProposalState.QUEUED:
      return 'Queued'
    case ProposalState.DEFEATED:
      return 'Defeated'
    case ProposalState.VETOED:
      return 'Vetoed'
    case ProposalState.CANCELLED:
      return 'Cancelled'
    case ProposalState.EXPIRED:
      return 'Expired'
    case ProposalState.ACTIVE:
      return 'Active'
    case ProposalState.PENDING:
      return 'Pending'
    default:
      return 'Pending'
  }
}
