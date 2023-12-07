import React, {createContext, useContext} from 'react';

import {useAccount} from '../hooks/useAccount';

export const AccountContext = createContext();

export const useAccountState = () => useContext(AccountContext);

export const AccountProvider = ({children}) => {
  const {
    account,
    balance,
    savingAccountError,
    isSavingAccount,
    clearSavingError,
    loadAccount,
    resetAccount,
    saveAccount,
    secureRetrieve,
  } = useAccount();

  const state = {
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

  return (
    <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
  );
};
