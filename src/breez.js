import {
  mnemonicToSeed,
  NodeConfigVariant,
  defaultConfig,
  EnvironmentType,
  connect,
  nodeInfo,
} from '@breeztech/react-native-breez-sdk';

import {BREEZ_API_KEY, BREEZ_INVITE_CODE, MNEMONIC_WORDS} from '@env';

const initNode = async words => {
  const onBreezEvent = event => {
    console.log(`received event ${event.type}`);
  };

  //TODO: use real words
  const seed = await mnemonicToSeed(MNEMONIC_WORDS);

  const nodeConfig = {
    type: NodeConfigVariant.GREENLIGHT,
    config: {
      inviteCode: BREEZ_INVITE_CODE,
    },
  };

  let config = await defaultConfig(
    EnvironmentType.PRODUCTION,
    BREEZ_API_KEY,
    nodeConfig,
  );

  try {
    // Connect to the Breez SDK make it ready for use
    await connect(config, seed, onBreezEvent);
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
