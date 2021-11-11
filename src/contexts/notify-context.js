import { createContext, useContext } from 'react'
import { notify } from '@extend-chrome/notify'

const NotifyContext = createContext(null)

const NotifyProvider = ({ children }) => {

  const onNotify = (message) => {
    notify
      .create({
        title: 'Jupiter Europa',
        message: message,
        iconUrl: "https://raw.githubusercontent.com/jupiter-project/browser-extension/master/src/assets/images/logo.png",
      })
  }

  return (
    <NotifyContext.Provider
      value={{
        onNotify
      }}
    >
      {children}
    </NotifyContext.Provider>
  )
}

const useNotify = () => {
  const context = useContext(NotifyContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  return context
}

export {
  NotifyProvider,
  useNotify
}