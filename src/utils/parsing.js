import {DateTime, Duration} from 'luxon';

export const parseDate = (date, locale = 'en') => {
  return DateTime.fromSeconds(parseInt(date))
    .setLocale(locale)
    .toLocaleString(DateTime['DATE_MED']);
};

export const parseTime = (date, locale = 'en') => {
  return DateTime.fromSeconds(parseInt(date))
    .setLocale(locale)
    .toLocaleString(DateTime['DATETIME_MED']);
};

export const invoiceDuration = seconds => {
  const duration = Duration.fromObject({seconds});
  return duration.toFormat("hh'h' mm'min'");
};

export const parseFiat = amount =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseSats = amount => {
  const amountNum = amount / 1000;
  return amountNum
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const fiatConversion = (amount, rate, useDecimals) => {
  const decimals = useDecimals ? 2 : 0;

  if (amount) {
    return parseFiat(((amount / 100000000) * rate).toFixed(decimals));
  }

  return '0';
};

export const satsConversion = (amount, rate) => {
  if (amount) {
    return parseFiat(((amount * 100000000) / rate).toFixed(0));
  }

  return '0';
};
