import {useCallback, useEffect, useState} from 'react';
import {
  connect,
  defaultConfig,
  EnvironmentType,
  mnemonicToSeed,
  NodeConfigVariant,
  nodeInfo,
} from '@breeztech/react-native-breez-sdk';
import {toByteArray} from 'react-native-quick-base64';

import {
  BREEZ_API_KEY,
  DEVICE_CERTIFICATE_BASE64,
  DEVICE_KEY_BASE64,
} from '@env';

export const useBreez = () => {
  const [balance, setBalance] = useState({
    lightning: null,
    btc: null,
  });

  const getBalance = async () => {
    try {
      const nodeInformation = await nodeInfo();
      const {channelsBalanceMsat, onchainBalanceMsat} = nodeInformation;
      setBalance({lightning: channelsBalanceMsat, btc: onchainBalanceMsat});
    } catch (error) {
      console.log(error);
    }
  };

  const eventCallback = newEvent => {
    console.log(newEvent);
  };

  const initNode = async words => {
    const seed = await mnemonicToSeed(words);

    const greenlightCredentials = {
      deviceKey: Array.from(toByteArray(DEVICE_KEY_BASE64)),
      deviceCert: Array.from(toByteArray(DEVICE_CERTIFICATE_BASE64)),
    };

    const nodeConfig = {
      type: NodeConfigVariant.GREENLIGHT,
      config: {
        partnerCredentials: greenlightCredentials,
      },
    };

    let config = await defaultConfig(
      EnvironmentType.PRODUCTION,
      BREEZ_API_KEY,
      nodeConfig,
    );

    try {
      // Connect to the Breez SDK make it ready for use
      await connect(config, seed, eventCallback);
      await getBalance();
    } catch (error) {
      console.log("initNode", error);
      throw new Error('errors.initNode');
    }

    return true;
  };

  return {balance, initNode};
};
