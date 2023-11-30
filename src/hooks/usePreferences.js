import {useState, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePreferences = () => {
  const {i18n} = useTranslation(); //i18n instance
  const [isloadingPreferences, setIsLoadingPreferences] = useState(false);
  const [currency, setCurrency] = useState({});
  const [lang, setLang] = useState('');

  const currencySetup = useCallback(async (value, useDecimals) => {
    try {
      let updatedCurrency = {value: value, decimals: useDecimals};
      console.log(updatedCurrency);
      //   setCurrency(currency => ({...currency, ...updatedCurrency}));
      //   await AsyncStorage.multiSet([
      //     ['preferences.currency.value', value],
      //     ['preferences.currency.decimals', useDecimals],
      //   ]);
    } catch (error) {
      console.log('Error setting currency preference', error);
    }
  }, []);

  const languageSetup = useCallback(
    async value => {
      try {
        setLang(value);
        await AsyncStorage.setItem('preferences.lang', value);
        await i18n.changeLanguage(value); //changes the app language
      } catch (error) {
        console.log('Error setting language preference', error);
      }
    },
    [i18n],
  );

  const configSetup = useCallback(async () => {
    setIsLoadingPreferences(true);
    try {
      const value = await AsyncStorage.multiGet([
        'settings.currency.value',
        'settings.currency.decimals',
        'settings.lang',
      ]);
      if (value[5][1]) {
        let updatedCurrency = {value: value[2][1], decimals: value[3][1]};
        languageSetup(value[4][1]);
        setCurrency(currency => ({...currency, ...updatedCurrency}));
      } else {
        let defaultCurrency = {value: 'COP', decimals: 'false'};
        setCurrency(currency => ({...currency, ...defaultCurrency}));
        setLang('es');
      }
    } catch (error) {
      console.log('Error reading settings', error);
    } finally {
      setIsLoadingPreferences(false);
    }
  }, [languageSetup]);

  useEffect(() => {
    if (!currency.value) {
      configSetup();
    }
  }, [currency.value, configSetup]);

  return {
    isloadingPreferences,
    currency,
    lang,
    currencySetup,
    languageSetup,
  };
};
