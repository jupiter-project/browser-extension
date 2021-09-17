import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { encode, decode } from 'js-base64'

import * as jupiterAPI from 'services/api-jupiter'
import { IS_EXTENSION } from 'config'
import useAccountStore from 'utils/hooks/useAccountStore'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)

export function AccountProvider({ children }) {
  const [passphrase, setPassphrase] = useState({})
  const [accountRS, setAccountRS] = useState('')
  const [accountInfo, setAccountInfo] = useState({})
  const [assets, setAssets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [accountStore = {}, setAccountStore = () => { }] = useAccountStore();

  useEffect(() => {
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

    if (!!passphrase) {
      const decodedPassphrase = decode(passphrase)
      setPassphrase(decodedPassphrase)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStore, setAccountRS, setPassphrase]);

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
    const encodedPassphrase = encode(passphrase)
    if (IS_EXTENSION) {
      setAccountStore({
        accountRS,
        passphrase: encodedPassphrase
      })
    } else {
      localStorage.setItem('accountRS', accountRS);
      localStorage.setItem('passphrase', encodedPassphrase);
    }

    setAccountRS(accountRS)
    setPassphrase(passphrase)
  }, [setAccountRS, setPassphrase, setAccountStore])

  const onLock = useCallback(() => {
    if (IS_EXTENSION) {
      setAccountStore({
        accountRS: '',
        passphrase: ''
      })
    } else {
      localStorage.clear();
    }

    setAccountRS('')
    setPassphrase('')
  }, [setAccountRS, setPassphrase, setAccountStore])

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