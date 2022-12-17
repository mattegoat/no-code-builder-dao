import * as React from 'react'
import { useSigner, useProvider } from 'wagmi'
import {
  Auction as AuctionInterface,
  Auction__factory,
  Token as TokenInterface,
  Token__factory,
  MetadataRenderer as MetadataRendererInterface,
  MetadataRenderer__factory,
  Governor as GovernorInterface,
  Governor__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'

export type NounsProtocolAddresses = {
  /**
   * Pass in the dao contract auction address if you want to interact with the auction
   */
  auctionAddress?: string
  /**
   * Pass in the dao contract token address
   */
  daoAddress?: string
  /**
   * Pass in the dao contract token address
   */
  metadataRendererAddress?: string
  /**
   * Pass in the dao contract governor address
   */
  governorAddress?: string
}

export function useNounsProtocol({
  auctionAddress,
  daoAddress,
  metadataRendererAddress,
  governorAddress,
}: NounsProtocolAddresses) {
  const [BuilderAuction, setBuilderAuction] = React.useState<AuctionInterface>()
  const [BuilderToken, setBuilderToken] = React.useState<TokenInterface>()
  const [BuilderGovernor, setBuilderGovernor] = React.useState<GovernorInterface>()
  const [BuilderTokenMetadata, setBuilderTokenMetadata] =
    React.useState<MetadataRendererInterface>()

  const { data: signer } = useSigner()
  const provider = useProvider()

  React.useEffect(() => {
    if (metadataRendererAddress) {
      setBuilderTokenMetadata(
        MetadataRenderer__factory.connect(metadataRendererAddress, signer || provider)
      )
    }

    if (daoAddress) {
      setBuilderToken(Token__factory.connect(daoAddress, signer || provider))
    }

    if (auctionAddress) {
      setBuilderAuction(Auction__factory.connect(auctionAddress, signer || provider))
    }

    if (governorAddress) {
      setBuilderGovernor(Governor__factory.connect(governorAddress, signer || provider))
    }
  }, [
    auctionAddress,
    daoAddress,
    metadataRendererAddress,
    governorAddress,
    signer,
    provider,
  ])

  return {
    BuilderAuction,
    BuilderToken,
    BuilderTokenMetadata,
    BuilderGovernor,
  }
}
