import React, {createContext, useContext} from 'react';

import {useBreez} from '../hooks/useBreez';

export const BreezContext = createContext();

export const useBreezState = () => useContext(BreezContext);

export const BreezProvider = ({children}) => {
  const {
    balance, disconnectNode, initNode, lastPaidInvoice, payments
  } = useBreez();

  const state = {balance, disconnectNode, initNode, lastPaidInvoice, payments};

  return (
    <BreezContext.Provider value={state}>{children}</BreezContext.Provider>
  );
};
