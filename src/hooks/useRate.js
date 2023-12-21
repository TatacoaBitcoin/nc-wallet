import useSWRNative from '@nandorojo/swr-react-native';
import {fetchFiatRates} from '@breeztech/react-native-breez-sdk';

const fetcher = async (url, token) => {
  const fiatRates = await fetchFiatRates();
  const selectedCurrencyRate = fiatRates.find(curr => curr.coin === token);
  return selectedCurrencyRate.value;
};

export const useRate = token => {
  const {data, error} = useSWRNative([URL, token], fetcher, {
    refreshInterval: 5000,
  });

  return {
    rate: data,
    isLoadingRate: !error && !data,
    rateError: error,
  };
};
