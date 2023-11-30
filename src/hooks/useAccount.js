import {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {mnemonicToSeedHex, entropyToMnemonic, Wordlists} from '@dreson4/react-native-quick-bip39';

import {getBalance, initNode} from '../breez';

const secureStore = async words => {
  const seed = mnemonicToSeedHex(words);
  await Keychain.setGenericPassword("seed", seed);
};

const secureRetrieve = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return entropyToMnemonic(credentials.password, Wordlists['en']);
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

  useEffect(() => {
    loadAccount();
  }, []);

  useEffect(() => {
    if (!account) return;

    async function fetchBalance() {
      const nodeBalance = await getBalance();
      setBalance(nodeBalance);
    }

    fetchBalance();
  }, [account]);

  const saveAccount = async words => {
    setIsSavingAccount(true);
    const nodeIsOk = await initNode(words);
    if (nodeIsOk) {
      await secureStore(words);
      setAccount(true);
    };
    setIsSavingAccount(false);
  };

  const loadAccount = async () => {
    const words = await secureRetrieve();
    if (!words) {
      setAccount(null)
      return;
    }

    const nodeIsOk = await initNode(words);
    if (nodeIsOk) {
      setAccount(true);
    };
  };

  const resetAccount = async () => {
    await secureReset();
    setAccount(null);
  };

  return {
    account,
    balance,
    isSavingAccount,
    loadAccount,
    resetAccount,
    saveAccount,
  };
};
