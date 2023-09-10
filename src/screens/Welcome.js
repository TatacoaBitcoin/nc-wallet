import React from 'react';
import {View, Text, Button} from 'react-native';
import {useTranslation} from 'react-i18next';

const Welcome = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View>
      <Text>{t('welcome.title')}</Text>
      <Button
        title={t('welcome.btn.register')}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title={t('welcome.btn.recovery')}
        onPress={() => navigation.navigate('Recovery')}
      />
    </View>
  );
};

export {Welcome};
