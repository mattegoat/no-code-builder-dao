import gql from 'graphql-tag'

export const DAO_ADDRESSES_QUERY = gql`
  query NounsAddresses($daoAddress: [String!]) {
    nouns {
      nounsDaos(where: { collectionAddresses: $daoAddress }) {
        nodes {
          treasuryAddress
          metadataAddress
          governorAddress
          auctionAddress
        }
      }
    }
  }
`
