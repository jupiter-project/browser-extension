import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

const SETTINGS_KEY = 'account';
const INITIAL_VALUE = {
  account: '',
  passphrase: '',
};

const useAccountStore = createChromeStorageStateHookLocal(SETTINGS_KEY, INITIAL_VALUE);

export default useAccountStore;