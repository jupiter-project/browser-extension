
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { useAccount } from 'contexts/account-context'
import MagicLoading from 'components/MagicLoading'
import LINKS from 'utils/constants/links'
import { PAGE_ROUTES, AUTH_RUTES } from 'utils/constants/routes'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)

export function RoutesProvider({ children }) {
  const { isLocked, accountRS, accountInfo } = useAccount()
  const [loading, setLoading] = useState(false)
  const [currentRouter, setCurrentRouter] = useState(LINKS.WELCOME)
  const [routerParams, setRouterParams] = useState({})

  useEffect(() => {
    if (!accountRS) {
      setCurrentRouter(LINKS.SIGN_IN)
      return
    }

    if (isLocked) {
      setCurrentRouter(LINKS.UNLOCK)
      return
    }

    if (!isEmpty(accountInfo)) {
      setCurrentRouter(LINKS.MY_ACCOUNT)
    } else {
      setCurrentRouter(LINKS.SIGN_IN)
    }
  }, [accountRS, isLocked, accountInfo]);

  const routePush = useCallback((value, params = {}) => {
    if (AUTH_RUTES.includes(value) && !isEmpty(accountInfo)) {
      return
    }

    if (PAGE_ROUTES.includes(value) && isEmpty(accountInfo)) {
      return
    }

    setCurrentRouter(value)
    setRouterParams(params)
  }, [accountInfo, setCurrentRouter, setRouterParams])

  return (
    <ContractContext.Provider
      value={{
        currentRouter,
        routerParams,
        routePush,
        setLoading
      }}
    >
      {loading && <MagicLoading loading={loading} />}
      {children}
    </ContractContext.Provider>
  )
}

export function useRoutes() {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  return context
}