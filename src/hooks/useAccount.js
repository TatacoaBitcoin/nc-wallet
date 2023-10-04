import {useEffect, useState} from 'react';

import {getBalance, getNodeConfig, getSeed, initNode} from '../breez';

export const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState({
    lightning: null,
    btc: null,
  });

  useEffect(() => {
    if (!account) return;

    async function fetchBalance() {
      const nodeBalance = await getBalance();
      setBalance(nodeBalance);
    }

    fetchBalance();
  }, [account]);

  //TODO: store seed words safely using encrypted storage
  const saveAccount = async words => {
    const seed = await getSeed(words);
    const config = await getNodeConfig();
    const nodeIsOk = await initNode(config, seed);
    if (nodeIsOk) setAccount(words);
  };

  const loadAccount = () => {
    // retrieves seed words
  };

  const resetAccount = async () => setAccount(null);

  return {account, balance, saveAccount, loadAccount, resetAccount};
};
