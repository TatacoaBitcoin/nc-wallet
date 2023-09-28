import {
  // addEventListener,
  mnemonicToSeed,
  NodeConfigType,
  defaultConfig,
  EnvironmentType,
  connect,
  nodeInfo,
} from '@breeztech/react-native-breez-sdk';

import {BREEZ_API_KEY, BREEZ_INVITE_CODE, MNEMONIC_WORDS} from '@env';

const initNode = async (words) => {
  //TODO: use real words
  const seed = await mnemonicToSeed(MNEMONIC_WORDS);

  const nodeConfig = {
    type: NodeConfigType.GREENLIGHT,
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
    await connect(config, seed);
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

const getBalance = async () => {
  try {
    const nodeInformation = await nodeInfo();
    const lnBalance = nodeInformation.channelsBalanceMsat;
    const onchainBalance = nodeInformation.onchainBalanceMsat;
    return({
      lightning: lnBalance,
      btc: onchainBalance,
    });
  } catch (error) {
    console.log(error);
  }
};

export {getBalance, initNode}
