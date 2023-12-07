import React, {createContext, useContext} from 'react';

import {useAccount} from '../hooks/useAccount';

export const AccountContext = createContext();

export const useAccountState = () => useContext(AccountContext);

export const AccountProvider = ({children}) => {
  const {
    account,
    balance,
    clearSavingError,
    isSavingAccount,
    loadAccount,
    resetAccount,
    saveAccount,
    savingAccountError,
  } = useAccount();

  const state = {
    account,
    balance,
    clearSavingError,
    isSavingAccount,
    saveAccount,
    savingAccountError,
    loadAccount,
    resetAccount,
  };

  return (
    <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
  );
};
