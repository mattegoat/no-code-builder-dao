import { DAO_ADDRESS } from '@dao-auction/config'
import { ethers } from 'ethers'
import { useAuth } from 'hooks/useAuth'
import React from 'react'
import { useNounsProtocol } from './useNounsProtocol'

export const useUserVotes = (): number | undefined => {
  const { address } = useAuth()
  return useAccountVotes(address ?? ethers.constants.AddressZero)
}

export const useAccountVotes = (account: string): number | undefined => {
  const [votes, setVotes] = React.useState<number | undefined>(0)

  const { BuilderToken } = useNounsProtocol({ daoAddress: DAO_ADDRESS })

  React.useEffect(() => {
    async function getVotes() {
      try {
        const votes = await BuilderToken?.getVotes(account)
        setVotes(votes?.toNumber())
      } catch (err) {
        console.error(err)
      }
    }
    getVotes()
  }, [BuilderToken, account])

  return votes
}
