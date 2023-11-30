import React, {useState} from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate, Dropdown, Text} from '../atoms';
import {LANGUAGES} from '../config/localization/languages';
import {CURRENCIES} from '../config/localization/currencies';

const Settings = () => {
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();
  const [lang, setLang] = useState(null);
  const [currency, setCurrency] = useState(null);

  return (
    <ScreenTemplate>
      <Text variant="title">Language</Text>
      <Dropdown
        data={LANGUAGES}
        value={lang}
        setValue={setLang}
        placeholder={'Select language'}
      />
      <Text variant="title">Currency</Text>
      <Dropdown
        data={CURRENCIES}
        value={currency}
        setValue={setCurrency}
        placeholder={'Select currency'}
      />
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </ScreenTemplate>
  );
};

export {Settings};
