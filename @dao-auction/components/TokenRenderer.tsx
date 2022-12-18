/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import TokenHolder from './TokenHolder'
import TokenWinningBid from './TokenWinningBid'
import { useAuctionBids } from '@dao-auction/hooks/useAuctionBids'
import {
  NounsBuilderAuctionAuctionBidEventProperties,
  NounsEvent,
} from '@dao-auction/types/zora.api.generated'
import { etherscanLink, shortenAddress } from '@dao-auction/lib'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

export default function TokenRenderer({
  tokenId,
  daoAddress,
  ...props
}: {
  daoAddress: string
  tokenId: string
}) {
  const { bids } = useAuctionBids({ collectionAddress: daoAddress, tokenId })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1440px]" {...props}>
      <TokenThumbnail tokenId={tokenId} daoAddress={daoAddress} />
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <TokenTitle daoAddress={daoAddress} tokenId={tokenId} />
        <div className="flex flex-col md:flex-row gap-10 pt-2">
          <TokenHolder daoAddress={daoAddress} tokenId={tokenId} />
          <div className="divider divider-horizontal  color-primary hidden md:flex"></div>
          <TokenWinningBid daoAddress={daoAddress} tokenId={tokenId} />
        </div>
        <span className="text-sm md:text-md lg:text-lg	font-bold pt-5">
          Born{' '}
          <span className=" text-secondary">
            {bids && bids.length
              ? new Date(
                  parseInt(
                    (
                      bids[0]?.properties
                        .properties as NounsBuilderAuctionAuctionBidEventProperties
                    )?.endTime
                  ) * 1000
                ).toLocaleString()
              : 'n/a'}
          </span>
        </span>
        <span className="text-sm md:text-md lg:text-lg	font-bold ">
          Winner{' '}
          <span className=" text-secondary">
            {bids && bids.length
              ? shortenAddress(
                  (
                    bids[0]?.properties
                      .properties as NounsBuilderAuctionAuctionBidEventProperties
                  )?.bidder
                )
              : 'n/a'}
          </span>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 pt-5">
          <label htmlFor="my-modal-4" className="btn  btn-primary">
            Bid History
          </label>
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

          <button className="btn btn-outline btn-secondary">Etherscan</button>
        </div>
      </div>
    </div>
  )
}

export function Bidder({ index, address }: { index: number; address: string }) {
  const { data } = useEnsAvatar({ addressOrName: address })
  const { data: ensName } = useEnsName({ address })
  return (
    <>
      <div className="avatar my-auto">
        <div className="w-10 rounded-full">
          <img src={data || `https://avatar.tobi.sh/${index}`} alt="avatar" />
        </div>
      </div>
      <div className="my-auto pl-4 font-semibold">
        {ensName || shortenAddress(address)}
      </div>
    </>
  )
}
