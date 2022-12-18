import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DAO_ADDRESS } from '@dao-auction/config'
import { useCallback, useMemo } from 'react'
import {
  useProposals,
  useStats,
  useTreasuryBalance,
  useTreasuryUSDValue,
  useUserVotes,
} from '@dao-auction/hooks'
import React from 'react'
import { useEnsName, useEnsAvatar } from 'wagmi'
import { shortenAddress } from './../../utils'
import ReactHtmlParser from 'react-html-parser'
import classes from './styles.module.css'
import { getProposalStatus } from '@dao-auction/lib/proposal'

const ProposalPage: NextPage = () => {
  const router = useRouter()
  const pid = parseInt(router.query.pid as string, 10)

  function goBack() {
    history.back()
  }

  const {
    details: proposals,
    proposals: details,
    status,
  } = useProposals({
    collectionAddress: DAO_ADDRESS,
  })

  const { ownerCount } = useStats({
    collectionAddress: DAO_ADDRESS,
  })

  const proposal = useMemo(
    () => (proposals ? proposals[proposals.length - pid] : null),
    [pid, proposals]
  )

  const detail = useMemo(
    () => (details ? details[details.length - pid] : null),
    [pid, details]
  )

  const proposalStatus = useMemo(
    () => (status ? status[status.length - pid] : null),
    [pid, status]
  )

  const { data: ensName } = useEnsName({
    address: proposal?.proposer,
  })

  const userVotes = useUserVotes()

  const handleVote = useCallback(() => {}, [])

  return (
    <div>
      <div className="justify-between w-full pt-7 flex flex-col sm:flex-row gap-4">
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
        <h1 className="m-auto text-left sm:text-center font-bold text-lg lg:text-2xl">
          {proposal?.description?.split('&&')[0]}
        </h1>
        <div className="badge badge-success p-3 my-auto font-bold">
          {proposalStatus !== null && getProposalStatus(proposalStatus)}
        </div>
      </div>
      <div className=" w-full pt-4">
        <h1 className="m-auto text-md lg:text-xl text-left">
          Proposed by{' '}
          <a
            className="text-secondary"
            href={`https://etherscan.io/address/${proposal?.proposer}`}>
            {ensName || shortenAddress(proposal?.proposer)}
          </a>{' '}
          at <a>{}</a>
        </h1>
      </div>
      <h1 className="font-bold text-xl pt-5 text-primary">Description</h1>
      <div className={classes.markdown}>
        {ReactHtmlParser(proposal?.description?.split('&&')[1] || '')}
      </div>
      <div></div>
      <h1 className="font-bold text-xl py-5 text-primary">Proposed transactions</h1>
      {/* TODO PROPOSED TX */}
      <h1 className="font-bold text-xl py-5 text-primary">Voting Stats</h1>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 mb-4">
        <div className="flex flex-col gap-4 p-4 outline w-full md:w-1/3 bg-neutral card">
          <h1 className="text-success text-center font-bold text-xl pb-6">For</h1>
          <h1 className=" text-center font-bold text-3xl pb-3">{detail?.forVotes}</h1>
          <progress
            className="progress progress-success w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
        <div className="flex flex-col gap-4 p-4 outline w-full md:w-1/3 bg-neutral card">
          <h1 className="text-error text-center font-bold text-xl pb-6">Against</h1>
          <h1 className=" text-center font-bold text-3xl pb-3">{detail?.againstVotes}</h1>
          <progress
            className="progress progress-error w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
        <div className="flex flex-col gap-4 p-4 outline w-full md:w-1/3 bg-neutral card">
          <h1 className="text-info text-center font-bold text-xl pb-6">Abstain</h1>
          <h1 className=" text-center font-bold text-3xl pb-3">{detail?.abstainVotes}</h1>
          <progress
            className="progress progress-info w-full mt-3"
            value="10"
            max="100"></progress>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 px-10 py-4 outline w-full bg-neutral card">
            <h1 className=" font-bold text-xl pb-2">Voters</h1>
            <h1 className=" text-right font-bold text-3xl text-secondary mt-auto pb-4">
              {detail?.forVotes + detail?.abstainVotes + detail?.againstVotes}{' '}
              <span className="text-sm text-primary-content">/{ownerCount}</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 px-10 py-4 outline w-full  bg-neutral card">
            <h1 className="font-bold text-xl pb-2">Threshold</h1>
            <h1 className=" text-right font-bold text-3xl text-secondary mt-auto pb-4">
              {proposal?.proposalThreshold}
            </h1>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 px-10 py-4 outline w-full md:w-1/2 bg-neutral card">
            <h1 className="font-bold text-xl pb-2">Ends</h1>
            <h1 className=" text-right font-bold text-3xl text-secondary mt-auto pb-4">
              {proposal?.voteEnd
                ? new Date(parseInt(proposal?.voteEnd) * 1000).toLocaleString()
                : 'n/a'}
            </h1>
          </div>
          <div className="flex flex-col gap-4 px-10 py-4 outline w-full md:w-1/2 bg-neutral card">
            <h1 className="font-bold text-xl pb-2">% of Treasury</h1>
            <div
              className="radial-progress text-secondary h-13 w-13 ml-auto"
              style={{ '--value': 70 } as React.CSSProperties}>
              70%
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="my-modal-4" className="btn outline w-full mb-6">
        Vote Now
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Vote</h3>
          <p className="py-4">You have {userVotes} votes</p>
          <div className="w-full flex flex-row gap-3">
            <select className="select select-primary w-full max-w-xs">
              <option disabled selected>
                Choose the option
              </option>
              <option>For</option>
              <option>Against</option>
              <option>Abstain</option>
            </select>
          </div>
          <div className="modal-action">
            <a className="btn" onClick={handleVote}>
              Vote
            </a>
          </div>
        </label>
      </label>
    </div>
  )
}
export default ProposalPage
