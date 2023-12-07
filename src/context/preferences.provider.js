import React, {createContext, useContext} from 'react';

import {usePreferences} from '../hooks/usePreferences';

export const PreferencesContext = createContext();

export const usePreferencesState = () => useContext(PreferencesContext);

export const PreferencesProvider = ({children}) => {
  const {isloadingPreferences, currency, lang, currencySetup, languageSetup} =
    usePreferences();

  const state = {
    isloadingPreferences,
    currency,
    lang,
    currencySetup,
    languageSetup,
  };

  return (
    <PreferencesContext.Provider value={state}>
      {children}
    </PreferencesContext.Provider>
  );
};
