import axios from 'axios'

import { JUPITER_URL } from 'config'

const apiAxios = axios.create({
  baseURL: JUPITER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

const getAccountByPassphrase = async (passphrase) => {
  return await apiAxios.get(`/nxt?requestType=getAccountId&secretPhrase=${passphrase}`)
}

const getAccountByAccountID = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const getAccount = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const getTransaction = async (transaction) => {
  return await apiAxios.get(`/nxt?requestType=getTransaction&transaction=${transaction}`)
}

const setAccountInfo = async (params) => {
  const url = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const getAccountAssets = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccountAssets&account=${account}&includeAssetInfo=true`)
}

const getBlockchainTransactions = async ({ account, firstIndex, lastIndex }) => {
  return await apiAxios.get(`/nxt?requestType=getBlockchainTransactions&account=${account}&firstIndex=${firstIndex}&lastIndex=${lastIndex}`)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getAccount,
  getTransaction,
  getAccountAssets,
  getBlockchainTransactions
};
