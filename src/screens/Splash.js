import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ScreenTemplate} from '../atoms';
import colors from '../styles/colors';
import {margin} from '../styles/spacing';
import Logo from '../assets/images/logo.png';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ScreenTemplate>
      <LinearGradient
        colors={[colors.purple, colors.black]}
        style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} />
          <Text style={styles.text}>Tatacoa Wallet</Text>
        </View>
      </LinearGradient>
    </ScreenTemplate>
  );
};

export {Splash};

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
  text: {
    color: 'white',
    fontFamily: 'vcr_osd_mono',
    fontSize: 40,
  },
});
