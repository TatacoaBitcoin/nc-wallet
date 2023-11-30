import React, {useState} from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate, Dropdown} from '../atoms';
import {LANGUAGES} from '../config/localization/languages';

const Settings = () => {
  const {resetAccount} = useAccountState();
  const {t} = useTranslation();
  const [lang, setLang] = useState(null);

  return (
    <ScreenTemplate>
      <Dropdown
        data={LANGUAGES}
        value={lang}
        setValue={setLang}
        placeholder={'Select language'}
      />
      <Button onPress={() => resetAccount()} title={t('settings.btn.reset')} />
    </ScreenTemplate>
  );
};

export {Settings};
