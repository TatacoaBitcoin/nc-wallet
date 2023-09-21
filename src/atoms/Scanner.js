import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

// import {FlashButton} from '../atoms';

const Scanner = ({action}) => {
  const navigation = useNavigation();
  const [flash, setFlash] = useState(false);

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

  const handleFlash = () => {
    setFlash(!flash);
  };

  const FlashMode = flash
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  return (
    <View>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        showMarker={true}
        containerStyle={styles.container}
        flashMode={FlashMode}
        // topContent={<FlashButton action={handleFlash} flash={flash} />}
        topViewStyle={styles.top}
      />
    </View>
  );
};

export {Scanner};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  top: {
    zIndex: 99,
  },
});
