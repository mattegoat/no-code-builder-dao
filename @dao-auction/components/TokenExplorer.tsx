import React from 'react'
import { useActiveAuction } from '../hooks/useActiveAuction'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
  /**
   * Renderer Component for current auction
   */
  auctionRenderer?: React.ReactNode
  /**
   * Renderer Component for dao tokens
   */
  tokenRenderer?: React.ReactNode
}

export default function TokenPagination({
  daoAddress,
  auctionRenderer,
  ...props
}: TokenExplorerProps) {
  const { totalSupply } = useActiveAuction(daoAddress)

  const [tokenId, setTokenId] = React.useState(0)

  React.useEffect(() => {
    totalSupply && setTokenId(totalSupply - 1)
  }, [totalSupply])

  const incrementId = React.useCallback(() => {
    if (totalSupply && tokenId < totalSupply - 1) {
      setTokenId(tokenId + 1)
    }
  }, [setTokenId, tokenId])

  const decrementId = React.useCallback(() => {
    if (totalSupply && tokenId > 0) {
      setTokenId(tokenId - 1)
    }
  }, [setTokenId, tokenId])

  if (!totalSupply) return null

  return (
    <div {...props} className="flex flex-col gap-2">
      {tokenId === totalSupply - 1 ? (
        <>
          {auctionRenderer || (
            <CurrentAuction daoAddress={daoAddress} tokenId={tokenId?.toString()!} />
          )}
        </>
      ) : (
        <TokenRenderer daoAddress={daoAddress} tokenId={tokenId?.toString()!} />
      )}
      <div className="flex flex-row gap-5 m-auto pt-4">
        <button
          onClick={decrementId}
          //className={` ${tokenId === 0 && 'pointer-events-none opacity-20'}`}
          className={`btn btn-outline btn-accent btn-square ${
            tokenId === 0 && 'pointer-events-none opacity-20'
          }`}>
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
        <button
          onClick={incrementId}
          // className={`${
          //   tokenId === totalSupply - 1 && 'pointer-events-none opacity-20'
          // }`}
          className={`btn btn-outline btn-accent btn-square ${
            tokenId === totalSupply - 1 && 'pointer-events-none opacity-20'
          }`}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd">
            <path
              fill="hsl(var(--p))"
              d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
