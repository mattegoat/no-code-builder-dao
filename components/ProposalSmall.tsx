import { useRouter } from 'next/router'
import { getProposalStatus } from '@dao-auction/lib/proposal'
import { ProposalState } from '@dao-auction/types/proposal'

export function ProposalSmall({
  proposalIndex,
  proposalTitle,
  timeline,
  status,
  proposalAuthor,
  threshold,
}: {
  proposalIndex: number
  proposalTitle: string
  timeline: string
  status: ProposalState | null
  proposalAuthor: string
  threshold: number
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/vote/${proposalIndex}`)
  }
  return (
    <div className="w-full rounded-md mt-4 bg-neutral">
      <div className="p-5 flex flex-row rounded-md bg-neutral-focus justify-between">
        <h1 className="text-bold text-xl">{proposalIndex}</h1>
        <h1 className="font-extrabold	 text-xl">
          {proposalTitle} <span className="font-semibold text-lg">by</span>{' '}
          <a href="https://etherscan.io/address/" className="text-secondary text-lg">
            {proposalAuthor}
          </a>
        </h1>
        <div className="badge badge-success p-3 font-bold">{status}</div>
        <div className="badge badge-success p-3">
          {status ? getProposalStatus(status) : '...'}
        </div>
      </div>
      <div className="flex flex-row p-5 gap-5">
        <div className="rounded-md flex flex-col w-1/4">
          <div className="rounded-md p-5 outline flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-success">For</h1>
            <div className="avatar-group -space-x-6">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral-focus text-neutral-content">
                  <span className="text-success font-bold">+10</span>
                </div>
              </div>
            </div>
          </div>
          <progress
            className="progress progress-success w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
        <div className="rounded-md flex flex-col w-1/4">
          <div className="rounded-md p-5 outline flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-error">Against</h1>
            <div className="avatar-group -space-x-6">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral-focus text-neutral-content">
                  <span className="text-error font-bold">+10</span>
                </div>
              </div>
            </div>
          </div>
          <progress
            className="progress progress-error w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
        <div className="rounded-md flex flex-col w-1/4">
          <div className="rounded-md p-5 outline flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-info">Abstain</h1>
            <div className="avatar-group -space-x-6">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral-focus text-neutral-content">
                  <span className="text-info font-bold">+10</span>
                </div>
              </div>
            </div>
          </div>
          <progress
            className="progress progress-info w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
        <div className="rounded-md flex flex-col w-1/4">
          <div className="rounded-md p-5 outline flex flex-col w-full h-full justify-between">
            <h1 className="font-bold text-lg pb-3  ">Threshold</h1>
            <h1 className="font-bold text-lg pb-3 text-accent">{threshold} votes</h1>
          </div>
          <progress
            className="progress progress-accent w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
      </div>
      <div className="p-5 flex flex-row rounded-md justify-end">
        <button className="btn outline gap-2" onClick={handleClick}>
          Read All
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd">
            <path
              fill="hsl(var(--pc))"
              d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
