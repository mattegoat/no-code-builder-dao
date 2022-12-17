import useLidoBalance from './useLidoBalance'
import { useCoingeckoPrice } from '@usedapp/coingecko'
import { BigNumber, ethers } from 'ethers'
import { useBalance } from 'wagmi'
import { useDao } from 'context/DaoProvider'

/**
 * Computes treasury balance (ETH + Lido)
 *
 * @returns Total balance of treasury (ETH + Lido) as EthersBN
 */
export const useTreasuryBalance = () => {
  const { daoInfo } = useDao()

  const treasuryAddress = daoInfo.treasuryAddress || ''

  const { data } = useBalance({ addressOrName: treasuryAddress })
  const lidoBalanceAsETH = useLidoBalance(treasuryAddress)
  const zero = BigNumber.from(0)
  return data?.value?.add(lidoBalanceAsETH ?? zero) ?? zero
}

/**
 * Computes treasury usd value of treasury assets (ETH + Lido) at current ETH-USD exchange rate
 *
 * @returns USD value of treasury assets (ETH + Lido) at current exchange rate
 */
export const useTreasuryUSDValue = () => {
  const etherPrice = Number(useCoingeckoPrice('ethereum', 'usd'))
  const treasuryBalanceETH = Number(
    ethers.utils.formatEther(useTreasuryBalance()?.toString() || '0')
  )
  return etherPrice * treasuryBalanceETH
}
