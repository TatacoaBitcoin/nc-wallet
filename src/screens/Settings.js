import React from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate, Dropdown, Text} from '../atoms';
import {LANGUAGES} from '../config/localization/languages';
import {CURRENCIES} from '../config/localization/currencies';
import {usePreferencesState} from '../context/preferences.provider';

const Settings = () => {
  const {lang, currency} = usePreferencesState();
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();

  return (
    <ScreenTemplate>
      <Text variant="title">Language</Text>
      <Dropdown
        id="lang"
        data={LANGUAGES}
        placeholder={'Select language'}
        selectedValue={lang}
      />
      <Text variant="title">Currency</Text>
      <Dropdown
        id="currency"
        data={CURRENCIES}
        placeholder={'Select currency'}
        selectedValue={currency.value}
      />
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </ScreenTemplate>
  );
};

export {Settings};
