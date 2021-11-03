import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as jupiterAPI from 'services/api-jupiter'
import { IS_EXTENSION } from 'config'
import useAccountStore from 'utils/hooks/useAccountStore'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)

export function AccountProvider({ children }) {
  const [isLocked, setIsLocked] = useState(true)
  const [passphrase, setPassphrase] = useState('')
  const [accountRS, setAccountRS] = useState('')
  const [accountInfo, setAccountInfo] = useState({})
  const [assets, setAssets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [accountStore = {}, setAccountStore = () => { }] = useAccountStore();

  useEffect(() => {
    const lock = localStorage.lock

    let accountRS = ''
    let passphrase = ''
    if (IS_EXTENSION) {
      accountRS = accountStore.accountRS;
      passphrase = accountStore.passphrase;
    } else {
      accountRS = localStorage.accountRS;
      passphrase = localStorage.passphrase;
    }

    if (!!accountRS) {
      setAccountRS(accountRS)
    }

    if (lock === 'lock') {
      setIsLocked(true)
      return
    } else {
      setIsLocked(false)
    }

    if (!!passphrase) {
      const decodedPassphrase = atob(passphrase)
      setPassphrase(decodedPassphrase)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStore, setAccountRS, setPassphrase, setIsLocked]);

  const getAccountInfo = useCallback(async () => {
    try {
      const response = await jupiterAPI.getAccount(accountRS);
      setAccountInfo(response)
    } catch (error) {
      console.log('[Error] getAssets => ', error)
    }
  }, [accountRS, setAccountInfo])

  useEffect(() => {
    if (!!accountRS && !isLocked) {
      getAccountInfo()
    } else {
      setAccountInfo({})
    }
  }, [isLocked, accountRS, getAccountInfo]);

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

  const setAccount = useCallback((accountRS, passphrase, password) => {
    const encodedPassphrase = btoa(passphrase)
    const encodedPassword = btoa(password)

    if (IS_EXTENSION) {
      setAccountStore({
        accountRS,
        passphrase: encodedPassphrase,
        password: encodedPassword
      })
    } else {
      localStorage.setItem('accountRS', accountRS);
      localStorage.setItem('passphrase', encodedPassphrase);
      localStorage.setItem('password', encodedPassword);
    }
    localStorage.setItem('lock', 'unlock');

    setAccountRS(accountRS)
    setPassphrase(passphrase)
    setIsLocked(false)
  }, [setAccountRS, setPassphrase, setIsLocked, setAccountStore])

  const onUnlock = useCallback((passwordValue) => {
    const encodedPassword = btoa(passwordValue)

    let passphrase = ''
    let password = ''
    if (IS_EXTENSION) {
      passphrase = accountStore.passphrase;
      password = accountStore.password;
    } else {
      passphrase = localStorage.passphrase;
      password = localStorage.password;
    }

    if (password !== encodedPassword) {
      return false
    }

    if (!!passphrase) {
      const decodedPassphrase = atob(passphrase)
      setPassphrase(decodedPassphrase)
    }

    localStorage.setItem('lock', 'unlock');
    setIsLocked(false)
    return true;
  }, [accountStore, setPassphrase, setIsLocked])

  const onLock = useCallback(() => {
    localStorage.setItem('lock', 'lock');
    setPassphrase('')
    setIsLocked(true)
  }, [setIsLocked, setPassphrase])

  return (
    <ContractContext.Provider
      value={{
        isLocked,
        accountRS,
        passphrase,
        accountInfo,
        assets,
        transactions,
        setAccount,
        onLock,
        onUnlock,
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
    isLocked,
    accountRS,
    passphrase,
    accountInfo,
    assets,
    transactions,
    setAccount,
    onLock,
    onUnlock,
    getAssets,
    getTransactions
  } = context

  return {
    isLocked,
    accountRS,
    passphrase,
    accountInfo,
    assets,
    transactions,
    setAccount,
    onLock,
    onUnlock,
    getAssets,
    getTransactions
  }
}