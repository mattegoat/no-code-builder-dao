import { useRouter } from 'next/router'
import { getProposalStatus } from '@dao-auction/lib/proposal'
import { Proposal, ProposalState } from '@dao-auction/types/proposal'
import { etherscanLink, shortenAddress } from '@dao-auction/lib'
import { useEnsName } from 'wagmi'
import { Status } from 'components/Status'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCountdown } from '@dao-auction'

dayjs.extend(relativeTime)

export function ProposalSmall({
  proposalIndex,
  proposalTitle,
  endTime,
  startTime,
  status,
  proposalAuthor,
  threshold,
  forCount,
  abstainCount,
  againstCount,
  totalVoters,
  currenBlock,
}: {
  proposalIndex: number
  proposalTitle: string
  endTime: string
  startTime: string
  status: ProposalState | null
  proposalAuthor: string
  threshold: number
  forCount: number
  abstainCount: number
  againstCount: number
  totalVoters: number
  currenBlock: number
}) {
  const router = useRouter()
  const { countdownString: countdownEnd } = useCountdown(Number(endTime))
  const { countdownString: countdownStart } = useCountdown(Number(startTime))

  const { data: ensName } = useEnsName({
    address: proposalAuthor,
  })

  const handleClick = () => {
    router.push(`/vote/${proposalIndex}`)
  }
  return (
    <div className="w-full card mt-4 bg-neutral ">
      <div className="p-5 flex flex-col md:flex-row card bg-neutral-focus w-full gap-3">
        <h1 className="text-bold text-xl pr-3 text-neutral-content">{proposalIndex}</h1>
        <h1 className="font-extrabold text-neutral-content	 text-xl pr-3">
          {proposalTitle} <span className="font-semibold text-lg">by</span>{' '}
          <a
            href={etherscanLink({ linkType: 'address', hash: proposalAuthor })}
            target="_blank"
            rel="noreferrer"
            className="text-secondary text-lg">
            {ensName || shortenAddress(proposalAuthor)}
          </a>
        </h1>
        <div className="flex flex-row gap-4 ml-auto">
          {status !== null && getProposalStatus(status) === 'Active' && (
            <div className="badge badge-neutral p-3 my-auto font-bold">
              Ends in {countdownEnd}
            </div>
          )}
          {status !== null && getProposalStatus(status) === 'Pending' && (
            <div className="badge badge-neutral p-3 my-auto font-bold">
              Starts in {countdownStart}
            </div>
          )}
          {status !== null && <Status proposalStatus={getProposalStatus(status)} />}
        </div>
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap p-5 gap-5">
        <div className="card flex flex-col w-full md:w-1/4">
          <div className="card p-5 card-bordered flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-success">For</h1>
            <span className="text-success font-bold text-center text-3xl">
              {forCount}
            </span>
          </div>
          <progress
            className="progress progress-success w-full mt-3"
            value={forCount}
            max={totalVoters}></progress>
        </div>
        <div className="card flex flex-col w-full md:w-1/4">
          <div className="card p-5 card-bordered flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-error">Against</h1>
            <span className="text-error font-bold text-center text-3xl">
              {againstCount}
            </span>
          </div>
          <progress
            className="progress progress-error w-full mt-3"
            value={againstCount}
            max={totalVoters}></progress>
        </div>
        <div className="card flex flex-col w-full md:w-1/4">
          <div
            className="card card-bordered p-5 flex flex-col w-full"
            style={{ borderColor: 'hsl(var(--nc))!important' }}>
            <h1 className="font-bold text-lg pb-3 text-info">Abstain</h1>
            <span className="text-info font-bold text-center text-3xl">
              {abstainCount}
            </span>
          </div>
          <progress
            className="progress progress-info w-full mt-3"
            value={abstainCount}
            max={totalVoters}></progress>
        </div>
        <div className="card flex flex-col w-full md:w-1/4">
          <div className="card p-5 card-bordered flex flex-col w-full h-full justify-between">
            <h1 className="font-bold text-lg text-accent">Threshold</h1>
            <h1 className="font-bold text-lg text-center  text-accent">
              {threshold} votes
            </h1>
          </div>
          <progress
            className="progress progress-accent w-full mt-3"
            value={forCount}
            max={threshold}></progress>
        </div>
      </div>
      <div className="p-5 flex flex-row card justify-end">
        <button className="btn outline gap-2" onClick={handleClick}>
          Read All
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd">
            <path
              fill="hsl(var(--nc))"
              d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
