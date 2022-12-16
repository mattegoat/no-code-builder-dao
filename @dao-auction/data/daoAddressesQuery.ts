import gql from 'graphql-tag'

export const DAO_ADDRESSES_QUERY = gql`
  query NounsAddresses($daoAddress: [String!]) {
    nouns {
      nounsDaos(where: { collectionAddresses: $daoAddress }) {
        nodes {
          name
          collectionAddress
          auctionAddress
          governorAddress
          metadataAddress
          description
          symbol
          totalSupply
          treasuryAddress
          contractAddress
        }
      }
    }
  }
`
