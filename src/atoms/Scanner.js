import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';

const Scanner = ({action}) => {
  const navigation = useNavigation();

  const onSuccess = e => {
    const data = e.data;
    if (data.startsWith('lnbc')) {
      navigation.navigate('Transaction', {
        mode: 'send',
        data,
      });
      action();
    } else if (data.startsWith('lightning:')) {
      navigation.navigate('Transaction', {
        mode: 'send',
        data: data.replace('lightning:', ''),
      });
      action();
    } else if (data.startsWith('lnurl')) {
      navigation.navigate('Transaction', {mode: 'receive', lnurl: data});
      action();
    } else {
      console.log('invalid data');
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      showMarker={true}
      containerStyle={styles.container}
      topViewStyle={styles.zeroContainer}
      cameraStyle={styles.cameraContainer}
    />
  );
};

export {Scanner};

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    top: -10,
    position: 'relative',
  },
});
