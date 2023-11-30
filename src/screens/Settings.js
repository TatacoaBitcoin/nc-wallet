import React from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate, Dropdown} from '../atoms';

const Settings = () => {
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();

  return (
    <ScreenTemplate>
      <Dropdown />
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </ScreenTemplate>
  );
};

export {Settings};
