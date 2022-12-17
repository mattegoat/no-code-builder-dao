import { useMemo, useEffect, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import { utils, BigNumber } from 'ethers'
import config from '../config'
import ERC20 from '../lib/abi/ERC20.json'
import { useProvider } from 'wagmi'

const { addresses } = config

const erc20Interface = new utils.Interface(ERC20)

function useLidoBalance(address: string | undefined): BigNumber | undefined {
  const provider = useProvider()

  const [balance, setBalance] = useState(undefined)

  const lidoContract = useMemo((): Contract | undefined => {
    if (!provider || !addresses.lidoToken) return
    return new Contract(addresses.lidoToken, erc20Interface, provider)
  }, [provider])

  useEffect(() => {
    if (!lidoContract || !address) return
    lidoContract.balanceOf(address).then(setBalance)
  }, [lidoContract, address])

  return balance
}

export default useLidoBalance
