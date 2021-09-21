import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

import { IS_EXTENSION } from 'config'

const SETTINGS_KEY = 'account';
const INITIAL_VALUE = {
  accountRS: '',
  passphrase: '',
  password: ''
};

const useAccountStore = IS_EXTENSION ? createChromeStorageStateHookLocal(SETTINGS_KEY, INITIAL_VALUE) : () => [];

export default useAccountStore;