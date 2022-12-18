import gql from 'graphql-tag'

export const DAO_AUCTION_BIDS_QUERY = gql`
  query AuctionsBids($collectionAddress: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
        }
        pagination: { limit: 500 }
        where: { collectionAddresses: $collectionAddress }
        sort: { sortKey: CREATED, sortDirection: DESC }
      ) {
        nodes {
          properties {
            ... on NounsBuilderAuctionEvent {
              __typename
              properties {
                ... on NounsBuilderAuctionAuctionBidEventProperties {
                  __typename
                  bidder
                  endTime
                  tokenId
                  amount
                  amountPrice {
                    chainTokenPrice {
                      decimal
                    }
                  }
                }
              }
            }
          }
          transactionInfo {
            blockTimestamp
            transactionHash
          }
        }
      }
    }
  }
`
