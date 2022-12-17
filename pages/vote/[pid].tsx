import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DAO_ADDRESS } from '@dao-auction/config'
import { useMemo } from 'react'
import {
  useProposals,
  useTreasuryBalance,
  useTreasuryUSDValue,
  useUserVotes,
} from '@dao-auction/hooks'

const ProposalPage: NextPage = () => {
  const router = useRouter()
  const pid = parseInt(router.query.pid as string, 10)

  function goBack() {
    history.back()
  }

  const { proposals } = useProposals({ collectionAddress: DAO_ADDRESS })

  const proposal = useMemo(() => (proposals ? proposals[pid] : null), [pid, proposals])

  return (
    <div>
      <div className="justify-between w-full pt-7 flex flex-row">
        {' '}
        <button onClick={goBack} className={`btn btn-outline btn-accent btn-square`}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            style={{ transform: 'rotate(180deg)' }}>
            <path
              fill="hsl(var(--p))"
              d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
            />
          </svg>
        </button>
        <h1 className="m-auto font-bold text-lg lg:text-2xl">
          {proposal?.description.split('&&')[0]}
        </h1>
        <div className="badge badge-success p-3 my-auto font-bold">test</div>
      </div>
    </div>
  )
}
export default ProposalPage
