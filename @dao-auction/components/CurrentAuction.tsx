import React, { useEffect, useState } from 'react'
import AuctionCountdown from './AuctionCountdown'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import { AuthCheck } from '../../components/elements'
import { auctionABI, useActiveAuction } from '../hooks/useActiveAuction'
import { useAuth } from 'hooks/useAuth'
import { Bidder } from './TokenRenderer'
import {
  NounsBuilderAuctionAuctionBidEventProperties,
  NounsEvent,
} from '@dao-auction/types/zora.api.generated'
import { etherscanLink } from '@dao-auction/lib'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useAuctionBids } from '@dao-auction/hooks'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useDao } from 'context/DaoProvider'

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
  const { daoInfo } = useDao()

  const { bids } = useAuctionBids({ collectionAddress: daoAddress, tokenId })

  const [auctionEnded, setAuctionEnded] = useState(false)
  const [auctionTimer, setAuctionTimer] = useState(false)

  const {
    auctionData,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
    totalSupply,
  } = useActiveAuction(daoAddress)

  const { config, error } = usePrepareContractWrite({
    addressOrName: daoInfo.auctionAddress,
    contractInterface: auctionABI,
    functionName: 'settleCurrentAndCreateNewAuction',
    args: [],
  })
  const {
    data,
    isLoading: isSettling,
    isSuccess,
    write: settle,
  } = useContractWrite(config)

  useEffect(() => {
    if (!auctionData) return

    const timeLeft = Number(auctionData.endTime) - Math.floor(Date.now() / 1000)

    if (auctionData && timeLeft <= 0) {
      setAuctionEnded(true)
    } else {
      setAuctionEnded(false)
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer)
        },
        timeLeft > 300 ? 30000 : 1000
      )

      return () => {
        clearTimeout(timer)
      }
    }
  }, [auctionTimer, auctionData])

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
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-10 m-auto">
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
                  disabled={!isConnected || createBidLoading}>
                  {createBidLoading ? '..' : 'Bid'}
                </button>
              </div>
              {createBidSuccess && (
                <span className="text-success">Bid successfuly submitted.</span>
              )}
            </div>
          </span>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                <span className="text-md font-semibold text-secondary pt-3 sm:pb-0">
                  Bid Activity
                </span>

                {bids?.slice(0, 3).map((bid: NounsEvent, index) => (
                  <tr key={index}>
                    <td className="flex p-1 pb-2 sm:p-4">
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
                    <td className="my-auto p-1 pb-2 sm:p-4 font-bold text-secondary">
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
                {bids?.length === 0 && <h3 className=" pt-4 text-accent">No bids yet</h3>}
              </tbody>
            </table>
          </div>
          {bids?.length !== 0 &&
            bids?.length !== 1 &&
            bids?.length !== 2 &&
            bids?.length !== 3 && (
              <div className="-translate-y-4 m-auto">
                <label htmlFor="my-modal-4" className="btn btn-sm">
                  See all
                </label>
              </div>
            )}
          {/* TODO button if not settle && auction ended + hide bids if not settled*/}
          {isConnected && auctionEnded && (
            <button
              className="btn btn-accent btn-outline"
              disabled={!settle}
              onClick={() => settle?.()}>
              {isSettling ? 'Settling..' : 'Settle Auction'}
            </button>
          )}
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold">
                Bids for {<TokenTitle daoAddress={daoAddress} tokenId={tokenId} />}
              </h3>
              <div className="py-4">
                <table className="table w-full">
                  <tbody>
                    {bids?.map((bid: NounsEvent, index) => (
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
                    {bids?.length === 0 && (
                      <h3 className="m-auto pl-4 font-bold text-secondary">No bids.</h3>
                    )}
                  </tbody>
                </table>
              </div>
            </label>
          </label>
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
