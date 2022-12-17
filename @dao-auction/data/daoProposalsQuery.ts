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
        where: { collectionAddresses: "0xd2e7684cf3e2511cc3b4538bb2885dc206583076" }
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
          }
        }
      }
    }
  }
`
