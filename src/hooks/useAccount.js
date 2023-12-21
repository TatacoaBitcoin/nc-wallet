import {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {
  mnemonicToSeedHex,
  entropyToMnemonic,
  Wordlists,
} from '@dreson4/react-native-quick-bip39';

import {useBreezState} from '../context/breez.provider';

const secureStore = async words => {
  await Keychain.setGenericPassword("words", words);
};

const secureRetrieve = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Keychain couldn't be accessed!", error);
    return false;
  }
};

const secureReset = async () => {
  return await Keychain.resetGenericPassword();
};

export const useAccount = () => {
  const {initNode} = useBreezState();
  const [account, setAccount] = useState(null);
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [savingAccountError, setSavingAccountError] = useState('');

  useEffect(() => {
    loadAccount();
  }, []);

  const saveAccount = async words => {
    setIsSavingAccount(true);
    try {
      const nodeIsOk = await initNode(words);
      if (nodeIsOk) {
        await secureStore(words);
        setAccount(true);
      }
    } catch (error) {
      setSavingAccountError(error);
    }
    setIsSavingAccount(false);
  };

  const loadAccount = async () => {
    const words = await secureRetrieve();
    if (!words) {
      setAccount(null);
      return;
    }

    const nodeIsOk = await initNode(words);
    if (nodeIsOk) {
      setAccount(true);
    }
  };

  const resetAccount = async () => {
    await secureReset();
    setAccount(null);
  };

  const clearSavingError = () => {
    setSavingAccountError('');
  };

  return {
    account,
    savingAccountError,
    isSavingAccount,
    clearSavingError,
    loadAccount,
    resetAccount,
    saveAccount,
    secureRetrieve,
  };
};
