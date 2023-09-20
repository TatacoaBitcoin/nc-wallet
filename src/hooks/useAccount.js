import {useState} from 'react';

export const useAccount = () => {
  const [account, setAccount] = useState(null);

  //TODO: store seed words safely using encrypted storage

  const saveAccount = words => {
    setAccount(words);
  };

  const loadAccount = () => {
    // retrieves seed words
  };

  const resetAccount = () => setAccount(null);

  return {account, saveAccount, loadAccount, resetAccount};
};
