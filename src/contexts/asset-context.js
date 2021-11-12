import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as jupiterAPI from 'services/api-jupiter'
import { useAccount } from 'contexts/account-context'
import { isEmpty } from 'utils/helpers/utility'

const ContractContext = createContext(null)
const initAssets = [
  '15210174725739850610',
  '2088497906655868238',
]

export function MainAssetProvider({ children }) {
  const { accountInfo } = useAccount()
  const [assets, setAssets] = useState([])

  const getAssets = useCallback(async () => {
    try {
      let assetArray = []
      for (const asset of initAssets) {
        const [
          assetInfo,
          accountAssetInfo,
          assetOrders
        ] = await Promise.all([
          jupiterAPI.getAssetById(asset),
          jupiterAPI.getAccountAssetInfo(accountInfo.account, asset),
          jupiterAPI.getAskOrders(asset),
        ])

        const { quantityQNT = 0 } = accountAssetInfo;
        const { askOrders = [] } = assetOrders;
        assetArray = [
          ...assetArray,
          {
            ...assetInfo,
            quantityQNT,
            order: askOrders[0]
          }
        ]
      }

      setAssets(assetArray)
    } catch (error) {
      console.log('[Error] getAssets => ', error)
    }
  }, [accountInfo, setAssets])

  useEffect(() => {
    if (!isEmpty(accountInfo)) {
      getAssets();
    }
  }, [accountInfo, getAssets])

  return (
    <ContractContext.Provider
      value={{
        assets
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

export function useMainAsset() {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  return context
}