import {useEffect, useState} from 'react';
import {generateMnemonic, Wordlists} from '@dreson4/react-native-quick-bip39';

export const useMnemonics = (lang = 'en') => {
  const [randomWords, setRandomWords] = useState();

  const generateWords = () => {
    const words = generateMnemonic(128, Wordlists[lang]);
    setRandomWords(words);
  };

  useEffect(() => {
    generateWords();
  }, []);

  return {randomWords, generateWords};
};
