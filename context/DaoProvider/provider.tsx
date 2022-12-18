import { DAO_ADDRESS } from '@dao-auction/config'
import { useAllAddresses } from '@dao-auction/hooks'
import React from 'react'

import { DaoContext } from './context'
import { TDao } from './model'

interface DaoProviderProps {
  children: React.ReactNode
}

const DaoProvider = ({ children }: DaoProviderProps): JSX.Element => {
  const data = useAllAddresses({ collectionAddress: DAO_ADDRESS })

  return (
    <DaoContext.Provider
      value={{ daoInfo: { ...data } as TDao }}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  )
}

export default DaoProvider
