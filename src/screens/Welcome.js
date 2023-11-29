import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import {Button, ScreenTemplate} from '../atoms';
import colors from '../styles/colors';
import {margin} from '../styles/spacing';
import Logo from '../assets/images/logo.png';

const Welcome = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScreenTemplate>
      <LinearGradient
        colors={[colors.purple, colors.black]}
        style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} />
          <Text style={styles.text}>Tatacoa Wallet</Text>
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
            disabled={true}
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
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    gap: margin.md,
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
