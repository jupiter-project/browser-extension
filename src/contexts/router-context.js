
import { createContext, useCallback, useContext, useState } from 'react'

import MagicLoading from 'components/MagicLoading'
import LINKS from 'utils/constants/links'

const ContractContext = createContext(null)

export function RoutesProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [currentRouter, setCurrentRouter] = useState(LINKS.WELCOME)

  const routePush = useCallback((value) => {
    setCurrentRouter(value)
  }, [setCurrentRouter])

  return (
    <ContractContext.Provider
      value={{
        currentRouter,
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

  const {
    currentRouter,
    routePush,
    setLoading
  } = context

  return {
    currentRouter,
    routePush,
    setLoading
  }
}