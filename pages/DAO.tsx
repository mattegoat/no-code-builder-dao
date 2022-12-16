import { useTreasuryBalance } from '@dao-auction/hooks'
import { useTreasuryUSDValue } from '@dao-auction/hooks/useTreasuryBalance'
import { useDao } from 'context/DaoProvider'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { ProposalSmall } from '../components/ProposalSmall'

const DAO: NextPage = () => {
  const { daoInfo } = useDao()

  const treasuryBalance = useTreasuryBalance()
  const treasuryUSDValue = useTreasuryUSDValue()

  return (
    <div>
      <h1 className="font-bold text-xl pt-5 text-primary">Governance</h1>
      <h1 className="font-bold text-xl sm:text:2xl lg:text-5xl pt-1">{daoInfo.name}</h1>
      <h1 className="font-bold text-xl pt-5 text-primary">Treasury</h1>
      <div className="flex flex-row gap-4 pt-1">
        <h1 className="font-bold text-md sm:text-lg md:text-2xl lg:text-4xl pt-1">
          Ξ {ethers.utils.formatEther(treasuryBalance)}
        </h1>
        <div className="divider divider-horizontal"></div>
        <h1 className="font-bold text-md sm:text-lg md:text-2xl lg:text-4xl pt-1 text-accent">
          {treasuryUSDValue.toFixed(2)} $
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between pt-7">
        <h1 className="font-bold text-xl text-primary">Proposals</h1>
        <div className="flex flex-row gap-6">
          {/* TO DO UPDATE NUMBER VOTES */}
          <h1 className="m-auto">You have x votes</h1>
          <button className="btn">Write Proposal</button>
        </div>
      </div>
      <div>
        <ProposalSmall
          proposalIndex={1}
          proposalTitle="Write the EIP-1253 in Cairo"
          timeline="12 December 2022"
          status="Pending"
          proposalAuthor="AustinGriffith.eth"></ProposalSmall>
      </div>
    </div>
  )
}

export default DAO
