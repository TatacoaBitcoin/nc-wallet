import {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {
  mnemonicToSeedHex,
  entropyToMnemonic,
  Wordlists,
} from '@dreson4/react-native-quick-bip39';

import {getBalance, initNode} from '../breez';

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
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState({
    lightning: null,
    btc: null,
  });
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [savingAccountError, setSavingAccountError] = useState('');

  useEffect(() => {
    loadAccount();
  }, []);

  const fetchBalance = async () => {
    const nodeBalance = await getBalance();
    setBalance(nodeBalance);
  };

  useEffect(() => {
    if (!account) return;
    fetchBalance();
  }, [account]);

  const saveAccount = async words => {
    setIsSavingAccount(true);
    try {
      const nodeIsOk = await initNode(words, eventCallback);
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

    const nodeIsOk = await initNode(words, eventCallback);
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

  const eventCallback = event => {
    if (['invoicePaid', 'paymentSucceed'].includes(event.type)) {
      fetchBalance();
    }
  };

  return {
    account,
    balance,
    savingAccountError,
    isSavingAccount,
    clearSavingError,
    loadAccount,
    resetAccount,
    saveAccount,
    secureRetrieve,
  };
};
