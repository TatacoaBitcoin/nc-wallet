import React from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate} from '../atoms';

const Settings = () => {
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();

  return (
    <ScreenTemplate>
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </ScreenTemplate>
  );
};

export {Settings};
