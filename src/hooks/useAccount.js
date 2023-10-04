import {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {mnemonicToSeedHex, entropyToMnemonic, Wordlists} from '@dreson4/react-native-quick-bip39';

import {getBalance, getNodeConfig, getSeed, initNode} from '../breez';

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

// await Keychain.resetGenericPassword();

export const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState({
    lightning: null,
    btc: null,
  });

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
    const seed = await getSeed(words);    
    const config = await getNodeConfig();
    const nodeIsOk = await initNode(config, seed);
    if (nodeIsOk) {
      await secureStore(words);
      setAccount(true);
    };
  };

  const loadAccount = async () => {
    const words = secureRetrieve();
    if (!words) {
      setAccount(null)
      return;
    }

    const seed = await getSeed(words);
    const config = await getNodeConfig();
    const nodeIsOk = await initNode(config, seed);
    if (nodeIsOk) {
      setAccount(true);
    };
  };

  const resetAccount = async () => setAccount(null);

  return {account, balance, saveAccount, loadAccount, resetAccount};
};
