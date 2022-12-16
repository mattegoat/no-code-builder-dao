import React from 'react'
import { useCountdown } from '@dao-auction/hooks/useCountdown'

export default function AuctionCountdown({ endTime }: { endTime: number }) {
  const { countdownString, isEnded } = useCountdown(endTime)

  return (
    <div className="flex flex-col gap-1">
      {!isEnded ? (
        <>
          <span className="text-md	font-semibold	text-secondary">Auction ends in</span>
          <span className="text-lg md:text-xl lg:text-3xl xl:text-4xl	font-bold">
            {countdownString}
          </span>
        </>
      ) : (
        <span className="text-md	font-semibold	">Auction is complete</span>
      )}
    </div>
  )
}
