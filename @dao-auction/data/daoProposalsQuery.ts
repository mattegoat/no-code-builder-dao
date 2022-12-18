import gql from 'graphql-tag'

export const DAO_PROPOSALS_QUERY = gql`
  query ProposalsCreated($collectionAddress: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsBuilderGovernorEventType: NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT
          nounsEventTypes: NOUNS_BUILDER_GOVERNOR_EVENT
        }
        pagination: { limit: 100 }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddress }
      ) {
        nodes {
          properties {
            ... on NounsBuilderGovernorEvent {
              __typename
              properties {
                ... on NounsBuilderGovernorProposalCreatedEventProperties {
                  __typename
                  abstainVotes
                  againstVotes
                  calldatas
                  canceled
                  description
                  descriptionHash
                  executed
                  forVotes
                  proposalId
                  proposalThreshold
                  proposer
                  quorumVotes
                  targets
                  timeCreated
                  values
                  vetoed
                  voteEnd
                  voteStart
                }
              }
            }
          }
          transactionInfo {
            transactionHash
            blockTimestamp
            blockNumber
          }
        }
      }
    }
  }
`

export const DAO_PROPOSALS_COUNT_QUERY = gql`
  query ProposalsCreated($collectionAddress: [String!]) {
    nouns {
      nounsEvents(
        filter: {
          nounsBuilderGovernorEventType: NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT
          nounsEventTypes: NOUNS_BUILDER_GOVERNOR_EVENT
        }
        pagination: { limit: 500 }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddress }
      ) {
        nodes {
          properties {
            ... on NounsBuilderGovernorEvent {
              __typename
              properties {
                ... on NounsBuilderGovernorProposalCreatedEventProperties {
                  __typename
                  proposalId
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          limit
        }
      }
    }
  }
`
