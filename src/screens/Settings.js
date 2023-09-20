import React from 'react';
import {View, Text, Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';

const Settings = () => {
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();

  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </View>
  );
};

export {Settings};
