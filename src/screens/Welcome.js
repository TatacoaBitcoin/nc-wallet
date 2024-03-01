import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import {Button, ScreenTemplate, Dropdown} from '../atoms';
import colors from '../styles/colors';
import {margin} from '../styles/spacing';
import Logo from '../assets/images/logo.png';
import {LANGUAGES} from '../config/localization/languages';
import {usePreferencesState} from '../context/preferences.provider';

const Welcome = ({navigation}) => {
  const {t} = useTranslation();
  const {lang} = usePreferencesState();

  return (
    <ScreenTemplate>
      <LinearGradient
        colors={[colors.purple, colors.black]}
        style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} />
          <Text style={styles.text}>Tatacoa Wallet</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            id="lang"
            data={LANGUAGES}
            placeholder={'Select language'}
            selectedValue={lang}
            width="80%"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            text={t('welcome.btn.register')}
            variant="primary"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            text={t('welcome.btn.recovery')}
            variant="outline"
            onPress={() => navigation.navigate('Recovery')}
          />
        </View>
      </LinearGradient>
    </ScreenTemplate>
  );
};

export {Welcome};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    gap: margin.md,
  },
  dropdownContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
    fontFamily: 'vcr_osd_mono',
    fontSize: 40,
  },
  buttonsContainer: {
    flex: 1,
    gap: margin.md,
    alignItems: 'center',
    width: '100%',
  },
});
