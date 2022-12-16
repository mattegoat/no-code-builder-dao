import React from 'react'

import type { TDaoContext } from './model'
import { DAO_PROVIDER_INITIAL_STATE } from './model'

export const DaoContext = React.createContext<TDaoContext>(DAO_PROVIDER_INITIAL_STATE)

export function useDao() {
  return React.useContext(DaoContext)
}
