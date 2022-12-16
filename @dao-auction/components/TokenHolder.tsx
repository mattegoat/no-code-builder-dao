import React from 'react'
import { useDaoToken } from '@dao-auction/hooks/useDaoToken'
import { useBidder } from '../hooks/useBidder'

export default function TokenTitle({
  tokenId,
  daoAddress,
}: {
  daoAddress: string
  tokenId: string
}) {
  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })

  const { bidder: holder } = useBidder(tokenData?.owner)

  if (!tokenData) return null

  return (
    <a
      href={`https://etherscan.io/address/${tokenData?.owner}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col leading-5">
      <div className="flex flex-col gap-1">
        <span className="text-md	font-semibold text-secondary">Held by</span>
        <span className="text-md md:text-xl lg:text-2xl	font-bold">{holder}</span>
      </div>
    </a>
  )
}
