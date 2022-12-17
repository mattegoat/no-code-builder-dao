import React from 'react'
import AuctionCountdown from './AuctionCountdown'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import { AuthCheck } from '../../components/elements'
import { useActiveAuction } from '../hooks/useActiveAuction'
import { useAuth } from 'hooks/useAuth'
import { Bidder } from './TokenRenderer'
import {
  NounsBuilderAuctionAuctionBidEventProperties,
  NounsEvent,
} from '@dao-auction/types/zora.api.generated'
import { etherscanLink } from '@dao-auction/lib'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useAuctionBids } from '@dao-auction/hooks'

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
  tokenId: string
}

export default function CurrentAuction({
  daoAddress,
  tokenId,
  ...props
}: CurrentAuctionProps) {
  const { isConnected } = useAuth()

  const { bids } = useAuctionBids({ collectionAddress: daoAddress, tokenId })

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
      <div className="flex flex-col gap-6 items-center lg:items-start">
        {totalSupply && (
          <TokenTitle daoAddress={daoAddress} tokenId={(totalSupply - 1).toString()} />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-md	font-semibold text-secondary">Current Bid</span>
              <span className="text-lg md:text-xl lg:text-3xl xl:text-4xl	font-bold">
                Ξ {auctionData?.highestBidPrice}
              </span>
            </div>
            <div className="divider divider-horizontal  color-primary"></div>
            {auctionData?.endTime && (
              <AuctionCountdown endTime={Number(auctionData.endTime)} />
            )}
          </div>
          <span>
            <div className="form-contro pt-4">
              <div className="input-group">
                <input
                  type="text"
                  pattern="[0-9.]*"
                  placeholder={`${auctionData?.minBidAmount?.toFixed(2)} Ξ or more`}
                  onChange={(event: any) => updateBidAmount(event.target.value)}
                  className="input input-bordered font-bold w-full lg:w-7/12"
                />
                <button
                  className="btn btn-square px-2 bg-primary"
                  onClick={createBid}
                  disabled={!isConnected}>
                  Bid
                </button>
              </div>
            </div>
          </span>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {bids?.slice(0, 3).map((bid: NounsEvent, index) => (
                  <tr key={index}>
                    <td className="flex">
                      <Bidder
                        index={index}
                        address={
                          (
                            bid.properties
                              .properties as NounsBuilderAuctionAuctionBidEventProperties
                          ).bidder
                        }
                      />
                    </td>
                    <td className="my-auto pl-4 font-bold text-secondary">
                      {
                        (
                          bid.properties
                            .properties as NounsBuilderAuctionAuctionBidEventProperties
                        ).amountPrice.chainTokenPrice?.decimal
                      }{' '}
                      Ξ
                    </td>
                    <td className="my-auto pl-4 font-bold text-secondary">
                      <a
                        href={etherscanLink({
                          linkType: 'tx',
                          hash: bid.transactionInfo.transactionHash || '',
                        })}
                        target="_blank"
                        rel="noreferrer">
                        <ArrowUpRightIcon className="text-primary" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <span>Bidder: {auctionData?.highestBidder}</span> */}
        </div>
        {/* <AuthCheck
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
        /> */}
      </div>
    </div>
  )
}
