export enum Vote {
  AGAINST = 0,
  FOR = 1,
  ABSTAIN = 2,
}

export enum ProposalState {
  UNDETERMINED = -1,
  PENDING,
  ACTIVE,
  CANCELLED,
  DEFEATED,
  SUCCEEDED,
  QUEUED,
  EXPIRED,
  EXECUTED,
  VETOED,
}

export interface ProposalData {
  data: Proposal[]
  error?: Error
  loading: boolean
}

export interface ProposalDetail {
  target: string
  value?: string
  functionSig: string
  callData: string
}

export interface Proposal {
  id: string | undefined
  title: string
  description: string
  status: ProposalState
  forCount: number
  againstCount: number
  abstainCount: number
  startVote: number
  eta: Date | undefined
  proposer: string | undefined
  proposalThreshold: number
  quorumVotes: number
  details: ProposalDetail[]
  transactionHash: string
}
