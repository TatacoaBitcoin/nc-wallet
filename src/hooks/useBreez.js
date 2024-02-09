import {useCallback, useState} from 'react';
import {
  connect,
  defaultConfig,
  disconnect,
  EnvironmentType,
  listPayments,
  mnemonicToSeed,
  NodeConfigVariant,
  nodeInfo,
} from '@breeztech/react-native-breez-sdk';
import {toByteArray} from 'react-native-quick-base64';
import RNFetchBlob from "rn-fetch-blob";

import {
  BREEZ_API_KEY,
  DEVICE_CERTIFICATE_BASE64,
  DEVICE_KEY_BASE64,
} from '@env';

// Events
const SYNCED = 'synced';
const INVOICE_PAID = 'invoicePaid';

export const useBreez = () => {
  const [balance, setBalance] = useState({
    lightning: null,
    btc: null,
  });
  const [payments, setPayments] = useState();
  const [workingDir, setWorkingDir] = useState();
  const [lastPaidInvoice, setLastPaidInvoice] = useState();

  const getBalance = async () => {
    try {
      const nodeInformation = await nodeInfo();
      const {channelsBalanceMsat, onchainBalanceMsat} = nodeInformation;
      setBalance({lightning: channelsBalanceMsat, btc: onchainBalanceMsat});
    } catch (error) {
      console.error("getBalance", error);
    }
  };

  const getPayments = async () => {
    try {
      const paymentsData = await listPayments({
        filter: ['sent', 'received'],
        includeFailures: true,
      });
      setPayments(paymentsData);
    } catch (error) {
      console.error("getPayments", error);
    }
  };

  const eventCallback = async newEvent => {
    const {type} = newEvent;

    if (type === SYNCED) {
      await getBalance();
      await getPayments();
    };
    if (type === INVOICE_PAID) {
      setLastPaidInvoice(newEvent.details.paymentHash);
    }
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
      await getPayments();
      setWorkingDir(config.workingDir);
    } catch (error) {
      console.error("initNode", error);
      throw new Error('errors.initNode');
    }

    return true;
  };

  const disconnectNode = async () => {
    try {
      await disconnect();
      await RNFetchBlob.fs.unlink(workingDir)
    } catch (error) {
      console.error('disconnectNode', error);
    }
  };

  return {balance, disconnectNode, initNode, lastPaidInvoice, payments};
};
