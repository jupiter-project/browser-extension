
const MESSAGES = Object.freeze({
  CONNECT_NO_ETHEREUM_PROVIDER_ERROR: 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.',
  CONNECT_UNSUPPORTED_CHAIN_ID_ERROR: 'You\'re connected to an unsupported network.',
  CONNECT_ACCESS_BINANCE_ERROR: 'Please authorize this website to access your Binance Smart Chain account.',
  CONNECT_UNKNOWN_ERROR: 'An unknown error occurred. Check the console for more details.',
  SIGN_IN_SUCCESS: 'Welcome to Jupiter Europa. You’ve successfully logged in.',
  SIGN_UP_SUCCESS: 'Welcome to Jupiter Europa. You have registered successfully.',
  AUTH_ERROR: 'Incorrect Passphrase, please try again. ',
  SET_ACCOUNT_ERROR: 'There was a problem updating your account info. Either your JUP balance is insufficient or you’ve entered an incorrect passphrase.',
  SET_ACCOUNT_SUCCESS: 'Your updated account info has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  WRONG_PASSWORD: 'Wrong Password!',
  SEND_ASSET_ERROR: 'Transfer Assets transaction failed',
  SEND_ASSET_SUCCESS: 'Transfer Assets transaction success',
  SEND_JUP_ERROR: 'Transfer Jup transaction failed',
  SEND_JUP_SUCCESS: 'Transfer Jup transaction success',
});

export default MESSAGES;