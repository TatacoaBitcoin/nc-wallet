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
