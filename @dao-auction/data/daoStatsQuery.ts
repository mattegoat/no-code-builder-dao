import gql from 'graphql-tag'

export const DAO_STATS_QUERY = gql`
  query NounsAddresses($collectionAddress: [String!]) {
    aggregateStat {
      ownerCount(where: { collectionAddresses: $collectionAddress })
      ownersByCount(
        where: { collectionAddresses: $collectionAddress }
        pagination: { limit: 500 }
      ) {
        nodes {
          tokenIds
          owner
          count
        }
      }
      salesVolume(where: { collectionAddresses: $collectionAddress }) {
        chainTokenPrice
        totalCount
        usdcPrice
      }
    }
  }
`
