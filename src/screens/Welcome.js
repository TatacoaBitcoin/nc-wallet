import React from 'react';
import {Text, Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ScreenTemplate} from '../atoms';

const Welcome = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScreenTemplate>
      <Text>{t('welcome.title')}</Text>
      <Button
        title={t('welcome.btn.register')}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title={t('welcome.btn.recovery')}
        onPress={() => navigation.navigate('Recovery')}
      />
    </ScreenTemplate>
  );
};

export {Welcome};
