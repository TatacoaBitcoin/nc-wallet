import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parseInput} from '@breeztech/react-native-breez-sdk';

const Controls = ({action, flash, navigation}) => {
  return (
    <View style={styles.controlsContainer}>
      <Pressable style={styles.button} onPress={action}>
        <Icon
          name={flash ? 'brightness-7' : 'brightness-5'}
          color={'red'}
          size={26}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Icon name={'close'} color={'red'} size={26} />
      </Pressable>
    </View>
  );
};

const Scanner = ({navigation}) => {
  const [flash, setFlash] = useState(false);

  const onSuccess = async e => {
    const data = e.data;

    try {
      const response = await parseInput(data);
      switch (response.type) {
        case 'bolt11':
          navigation.navigate('Send', {data: response.data});
          break;
        default:
          console.log('unsupported format');
      }
    } catch (error) {
      console.log('qr scan error: ', error);
    }
  };

  const handleFlash = () => {
    setFlash(!flash);
  };

  const FlashMode = flash
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      showMarker={true}
      flashMode={FlashMode}
      topContent={<Text style={styles.textContainer}>Scan QR Code</Text>}
      bottomContent={
        <Controls action={handleFlash} flash={flash} navigation={navigation} />
      }
      // topViewStyle={styles.topView}
      // cameraStyle={styles.cameraContainer}
      containerStyle={{backgroundColor: 'black'}}
    />
  );
};

export {Scanner};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'red',
  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    color: 'red',
    fontSize: 15,
  },
});
