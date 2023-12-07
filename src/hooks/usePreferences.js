import {useState, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePreferences = () => {
  const {i18n} = useTranslation(); //i18n instance
  const [isloadingPreferences, setIsLoadingPreferences] = useState(false);
  const [currency, setCurrency] = useState({});
  const [lang, setLang] = useState('');

  const currencySetup = useCallback(async selectedCurrency => {
    try {
      setCurrency(selectedCurrency);
      await AsyncStorage.setItem('currency', JSON.stringify(selectedCurrency));
    } catch (error) {
      console.log('Error setting currency preference', error);
    }
  }, []);

  const languageSetup = useCallback(
    async value => {
      try {
        setLang(value);
        await AsyncStorage.setItem('lang', value);
        await i18n.changeLanguage(value); //changes the app language
      } catch (error) {
        console.log('Error setting language preference', error);
      }
    },
    [i18n],
  );

  const loadPreferences = useCallback(async () => {
    setIsLoadingPreferences(true);
    try {
      const value = await AsyncStorage.multiGet(['currency', 'lang']);
      if (value[0][1]) {
        languageSetup(value[1][1]);
        setCurrency(JSON.parse(value[0][1]));
      } else {
        let defaultCurrency = {value: 'COP', decimals: 'false'};
        setCurrency(defaultCurrency);
        languageSetup('es');
      }
    } catch (error) {
      console.log('Error reading settings', error);
    } finally {
      setIsLoadingPreferences(false);
    }
  }, [languageSetup]);

  useEffect(() => {
    loadPreferences();
  }, []);

  return {
    isloadingPreferences,
    currency,
    lang,
    currencySetup,
    languageSetup,
  };
};
