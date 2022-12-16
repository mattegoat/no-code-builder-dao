/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react'
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
      <div className="flex flex-col gap-4">
        <TokenTitle daoAddress={daoAddress} tokenId={tokenId} />
        <div className="flex flex-row gap-10 pt-2">
          <TokenHolder daoAddress={daoAddress} tokenId={tokenId} />
          <div className="divider divider-horizontal  color-primary"></div>
          <TokenWinningBid daoAddress={daoAddress} tokenId={tokenId} />
        </div>
        <span className="text-sm md:text-md lg:text-lg	font-bold pt-5">
          Born <span className=" text-secondary">December 12, 2022</span>
        </span>
        <span className="text-sm md:text-md lg:text-lg	font-bold ">
          Winner <span className=" text-secondary">austingriffith.eth</span>
        </span>
        <div className="flex flex-row gap-4 pt-5">
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
                          <div className="avatar my-auto">
                            <div className="w-10 rounded-full">
                              <img
                                src={
                                  useEnsAvatar({
                                    addressOrName: (
                                      bid.properties
                                        .properties as NounsBuilderAuctionAuctionBidEventProperties
                                    ).bidder,
                                  }).data || `https://avatar.tobi.sh/${index}`
                                }
                              />
                            </div>
                          </div>
                          <div className="my-auto pl-4 font-semibold">
                            {useEnsName({
                              address: (
                                bid.properties
                                  .properties as NounsBuilderAuctionAuctionBidEventProperties
                              ).bidder,
                            }).data ||
                              shortenAddress(
                                (
                                  bid.properties
                                    .properties as NounsBuilderAuctionAuctionBidEventProperties
                                ).bidder
                              )}
                          </div>
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
            </label>
          </label>

          <button className="btn btn-outline btn-secondary">Etherscan</button>
        </div>
      </div>
    </div>
  )
}
