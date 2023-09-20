import React from 'react';
import {View, ScrollView, Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useMnemonics} from '../hooks/useMnemonics';
import {useAccountState} from '../context/account.provider';
import {WordList} from '../molecules';

const Register = ({navigation}) => {
  const {t} = useTranslation();
  const {randomWords, generateWords} = useMnemonics();
  const words = randomWords && randomWords.split(' ');
  const {saveAccount} = useAccountState();

  return (
    <View>
      {words && (
        <ScrollView>
          <WordList list={words} />
          <Button onPress={generateWords} title={t('register.btn.refresh')} />
          <Button
            onPress={() => saveAccount(words)}
            title={t('register.btn.continue')}
          />
        </ScrollView>
      )}
    </View>
  );
};

export {Register};
