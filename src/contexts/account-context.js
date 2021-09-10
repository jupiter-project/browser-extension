
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as jupiterAPI from 'services/api-jupiter'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)
const PASSPHRASE = 'human future nose relax monster stress relax choosen acher chill wife bare'

export function AccountProvider({ children }) {
  const [passphrase, setPassphrase] = useState({})
  const [accountInfo, setAccountInfo] = useState({})
  const [assets, setAssets] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const accountInfo = localStorage.accountInfo;
    if (!!accountInfo) {
      setAccountInfo(JSON.parse(accountInfo))
      setPassphrase(PASSPHRASE)
    }
  }, [setAccountInfo]);

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
    localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
    setAccountInfo(accountInfo)
  }, [setAccountInfo])

  const onLock = useCallback(() => {
    localStorage.clear();
    setAccountInfo({})
  }, [setAccountInfo])

  return (
    <ContractContext.Provider
      value={{
        passphrase,
        accountInfo,
        assets,
        transactions,
        setAccount,
        onLock,
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
    passphrase,
    accountInfo,
    assets,
    transactions,
    setAccount,
    onLock,
    getAssets,
    getTransactions
  } = context

  return {
    passphrase,
    accountInfo,
    assets,
    transactions,
    setAccount,
    onLock,
    getAssets,
    getTransactions
  }
}