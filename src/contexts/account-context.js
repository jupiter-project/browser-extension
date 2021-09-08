
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as jupiterAPI from 'services/api-jupiter'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)

export function AccountProvider({ children }) {
  const [accountInfo, setAccountInfo] = useState({})
  const [assets, setAssets] = useState([])
  const [transactions, setTransactions] = useState([])

  const getAssets = useCallback(async () => {
    try {
      const { accountAssets = [] } = await jupiterAPI.getAccountAssets(accountInfo.account);
      setAssets(accountAssets)
    } catch (error) {
      console.log('[Error] getAssets => ', error)
    }
  }, [accountInfo, setAssets])

  const getTransactions = useCallback(async () => {
    try {
      const params = {
        account: accountInfo.account,
        firstIndex: 0,
        lastIndex: 10
      }
      const { transactions = [] } = await jupiterAPI.getBlockchainTransactions(params);
      setTransactions(transactions)
    } catch (error) {
      console.log('[Error] getTransactions => ', error)
    }
  }, [accountInfo, setTransactions])

  useEffect(() => {
    if (!isEmpty(accountInfo)) {
      getAssets();
      getTransactions();
    }
  }, [accountInfo, getAssets, getTransactions])

  const setAccount = useCallback((accountInfo) => {
    setAccountInfo(accountInfo)
  }, [setAccountInfo])

  return (
    <ContractContext.Provider
      value={{
        accountInfo,
        assets,
        transactions,
        setAccount,
        getAssets,
        getTransactions
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  const {
    accountInfo,
    assets,
    transactions,
    setAccount,
    getAssets,
    getTransactions
  } = context

  return {
    accountInfo,
    assets,
    transactions,
    setAccount,
    getAssets,
    getTransactions
  }
}