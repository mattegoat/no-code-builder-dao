export function ProposalSmall({
  proposalIndex,
  proposalTitle,
  timeline,
  status,
  proposalAuthor,
}: {
  proposalIndex: number
  proposalTitle: string
  timeline: string
  status: string
  proposalAuthor: string
}) {
  return (
    <div className="w-full rounded-md mt-4 bg-neutral">
      <div className="p-5 flex flex-row rounded-md bg-primary justify-between">
        <h1 className="text-bold text-xl">{proposalIndex}</h1>
        <h1 className="font-extrabold	 text-xl">
          {proposalTitle} <span className="font-semibold text-lg">by</span>{' '}
          <a href="https://etherscan.io/address/" className="text-secondary text-lg">
            {proposalAuthor}
          </a>
        </h1>
        <div className="badge badge-success p-3">{status}</div>
      </div>
      <div className="flex flex-row p-5 gap-5">
        <div className="rounded-md flex flex-col w-1/4">
          <div className="rounded-md p-5 bg-success flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-neutral">For</h1>
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
                  <span>+10</span>
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
          <div className="rounded-md p-5 bg-error flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-neutral">Against</h1>
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
                  <span>+10</span>
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
          <div className="rounded-md p-5 bg-info flex flex-col w-full">
            <h1 className="font-bold text-lg pb-3 text-neutral">Abstain</h1>
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
                  <span>+10</span>
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
          <div className="rounded-md p-5 bg-base-100 flex flex-col w-full h-full justify-between">
            <h1 className="font-bold text-lg pb-3 text-neutral invert ">Threshold</h1>
            <h1 className="font-bold text-lg pb-3 text-accent invert ">12 votes</h1>
          </div>
          <progress
            className="progress progress-neutral-content w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
      </div>
      <div className="p-5 flex flex-row rounded-md justify-end">
        <button className="btn outline gap-2">
          Read All
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd">
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
