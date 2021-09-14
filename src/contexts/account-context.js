import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as jupiterAPI from 'services/api-jupiter'
import { isEmpty } from 'utils/helpers/utility'
// import useAccountStore from 'utils/hooks/useAccountStore'

const ContractContext = createContext(null)

export function AccountProvider({ children }) {
  const [passphrase, setPassphrase] = useState({})
  const [accountRS, setAccountRS] = useState('')
  const [accountInfo, setAccountInfo] = useState({})
  const [assets, setAssets] = useState([])
  const [transactions, setTransactions] = useState([])
  // const [accounts] = useAccountStore();

  useEffect(() => {
    const accountRS = localStorage.accountRS;
    const passphrase = localStorage.passphrase;
    if (!!accountRS) {
      setAccountRS(accountRS)
    }

    if (!!passphrase) {
      setPassphrase(passphrase)
    }
  }, [setAccountRS, setPassphrase]);

  const getAccountInfo = useCallback(async () => {
    try {
      const response = await jupiterAPI.getAccount(accountRS);
      setAccountInfo(response)
    } catch (error) {
      console.log('[Error] getAssets => ', error)
    }
  }, [accountRS, setAccountInfo])

  useEffect(() => {
    if (!!accountRS) {
      getAccountInfo(accountRS)
    } else {
      setAccountInfo({})
    }
  }, [accountRS, getAccountInfo]);

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

  const setAccount = useCallback((accountRS, passphrase) => {
    localStorage.setItem('accountRS', accountRS);
    localStorage.setItem('passphrase', passphrase);
    setAccountRS(accountRS)
    setPassphrase(passphrase)
  }, [setAccountRS, setPassphrase])

  const onLock = useCallback(() => {
    localStorage.clear();
    setAccountRS('')
  }, [setAccountRS])

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