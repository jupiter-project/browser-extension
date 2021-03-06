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
  const url = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const getAccountAssets = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccountAssets&account=${account}&includeAssetInfo=true`)
}

const getBlockchainTransactions = async ({ account, firstIndex, lastIndex }) => {
  return await apiAxios.get(`/nxt?requestType=getBlockchainTransactions&account=${account}&firstIndex=${firstIndex}&lastIndex=${lastIndex}`)
}

const sendMoney = async (params) => {
  const url = `/nxt?requestType=sendMoney&recipient=${params.receiver}&amountNQT=${params.amount}&message=${params.sender}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const transferAsset = async (params) => {
  const url = `/nxt?requestType=transferAsset&recipient=${params.receiver}&asset=${params.asset}&quantityQNT=${params.amount}&message=${params.sender}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const broadcastTransaction = async (transactionBytes) => {
  const url = `/nxt?requestType=broadcastTransaction&transactionBytes=${transactionBytes}`;
  return await apiAxios.post(url)
}

const getAssetById = async (asset) => {
  return await apiAxios.get(`/nxt?requestType=getAsset&asset=${asset}`)
}

const getAccountAssetInfo = async (account, asset) => {
  return await apiAxios.get(`/nxt?requestType=getAccountAssets&asset=${asset}&account=${account}`)
}

const getAskOrders = async (asset) => {
  return await apiAxios.get(`/nxt?requestType=getAskOrders&asset=${asset}`)
}

const placeBidOrder = async (params) => {
  const url = `/nxt?requestType=placeBidOrder&asset=${params.asset}&quantityQNT=${params.quantity}&priceNQT=${params.price}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getAccount,
  getTransaction,
  getAccountAssets,
  getBlockchainTransactions,
  sendMoney,
  transferAsset,
  broadcastTransaction,
  getAssetById,
  getAccountAssetInfo,
  getAskOrders,
  placeBidOrder
};
