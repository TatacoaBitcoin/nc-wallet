import {DateTime} from 'luxon';

export const parseDate = (date, locale = 'en') => {
  return DateTime.fromSeconds(parseInt(date))
    .setLocale(locale)
    .toLocaleString(DateTime['DATE_MED']);
};
