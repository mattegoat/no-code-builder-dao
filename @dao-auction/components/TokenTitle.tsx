import React from 'react'
import { useDaoToken } from '@dao-auction/hooks/useDaoToken'

export default function TokenTitle({
  tokenId,
  daoAddress,
  externalLinkBaseURI = 'https://nouns.build/dao',
}: {
  daoAddress: string
  tokenId: string
  /**
   * External link base url
   * @default 'https://nouns.build/dao'
   */
  externalLinkBaseURI?: string
}) {
  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })

  return (
    <a
      href={`${externalLinkBaseURI}/${daoAddress}/${tokenId}`}
      target="_blank"
      rel="noreferrer">
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl	font-bold">
        {tokenData?.metadata?.name}
      </h1>
    </a>
  )
}
