import {
  mnemonicToSeed,
  NodeConfigVariant,
  defaultConfig,
  EnvironmentType,
  connect,
  nodeInfo,
} from '@breeztech/react-native-breez-sdk';
import { toByteArray } from 'react-native-quick-base64';

import {
  BREEZ_API_KEY,
  DEVICE_CERTIFICATE_BASE64,
  DEVICE_KEY_BASE64,
} from '@env';

const initNode = async (words, eventCallback) => {
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
  } catch (error) {
    console.log(error);
    throw new Error('errors.initNode');
  }

  return true;
};

const getBalance = async () => {
  try {
    const nodeInformation = await nodeInfo();
    const lnBalance = nodeInformation.channelsBalanceMsat;
    const onchainBalance = nodeInformation.onchainBalanceMsat;
    return {
      lightning: lnBalance,
      btc: onchainBalance,
    };
  } catch (error) {
    console.log(error);
  }
};

export {getBalance, initNode};
