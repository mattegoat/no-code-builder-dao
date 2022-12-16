import React from 'react'
import AuctionCountdown from './AuctionCountdown'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import { AuthCheck } from '../../components/elements'
import { useActiveAuction } from '../hooks/useActiveAuction'
import TokenPagination from './TokenExplorer'
import Image from 'next/image'
import hammer from '../../public/hammer.png'

/**
 * TODO:
 * - render bid success txHash
 * - break ui out into atomic components
 */

export interface CurrentAuctionProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
}

export default function CurrentAuction({ daoAddress, ...props }: CurrentAuctionProps) {
  const {
    auctionData,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
    totalSupply,
  } = useActiveAuction(daoAddress)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      {auctionData?.tokenId && (
        <TokenThumbnail tokenId={auctionData.tokenId} daoAddress={daoAddress} />
      )}
      <div className="flex flex-col  gap-6">
        {totalSupply && (
          <TokenTitle daoAddress={daoAddress} tokenId={(totalSupply - 1).toString()} />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-1">
              <span className="text-md	font-semibold	">Current Bid:</span>
              <span className="text-4xl	font-bold	">Ξ {auctionData?.highestBidPrice}</span>
            </div>
            {auctionData?.endTime && (
              <AuctionCountdown endTime={Number(auctionData.endTime)} />
            )}
          </div>
          <span>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Bid"
                  className="input input-bordered font-bold"
                />
                <button className="btn btn-square px-2">
                  <Image src={hammer} style={{ filter: 'invert(0.8)' }} />
                </button>
              </div>
            </div>
          </span>
          <span>Bidder: {auctionData?.highestBidder}</span>
        </div>
        <AuthCheck
          connectCopy={'Connect to bid'}
          formUI={
            <div>
              <form onSubmit={createBid} className="flex flex-row gap-4">
                <input
                  className="form-input px-[10px] py-[5px]"
                  type="text"
                  pattern="[0-9.]*"
                  placeholder={`${auctionData?.minBidAmount} ETH`}
                  onChange={(event: any) => updateBidAmount(event.target.value)}
                />
                {!createBidLoading && !createBidSuccess ? (
                  <button
                    className={`underline ${
                      !isValidBid && 'pointer-events-none opacity-20'
                    }`}>
                    Place Bid
                  </button>
                ) : (
                  <>
                    {createBidLoading && <span>Submitting bid</span>}
                    {createBidSuccess && (
                      <a
                        href={`https://nouns.build/dao/${daoAddress}`}
                        target="_blank"
                        rel="noreferrer">
                        Bid placed: view on nouns.build
                      </a>
                    )}
                  </>
                )}
              </form>
            </div>
          }
        />
      </div>
    </div>
  )
}
