/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import { format } from 'date-fns';

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DATE_FORMAT = 'yyyy-MM-dd ';

// Format Rule: https://date-fns.org/v2.28.0/docs/format
const FORMATTERS = {
  normal: DATE_FORMAT,
  datetime: DATE_TIME_FORMAT,
  datetimeWithoutSec: 'yyyy-MM-dd HH:mm',
  monthOnly: 'MM-dd',
  hourOnly: 'HH:mm',
};

const dayjsParseDate = (date: dayjs.Dayjs | undefined) => {
  if (!date) return;
  if (date instanceof Date) return date;

  return dayjs(date).toDate();
};

export function formatDate(
  date: dayjs.Dayjs | undefined = undefined,
  formatter: string | ((f: typeof FORMATTERS) => string) = FORMATTERS.normal,
): string {
  if (typeof formatter === 'function') formatter = formatter(FORMATTERS);
  const parsedDate = dayjsParseDate(date);
  return parsedDate ? format(parsedDate, formatter) : '';
}

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  formatter: string | ((f: typeof FORMATTERS) => string) = FORMATTERS.datetime,
) {
  if (date == '0001-01-01T00:00:00Z') date = '';
  return formatDate(date, formatter);
}

export function formatToDateTimeBy12HWithLocale(
  date: dayjs.Dayjs | undefined = undefined,
  locale: string,
) {
  // Moment format style: https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format
  // 中文： 2022-05-29 下午 3:44:52
  // En: 2022-05-29 03:44:52 PM
  const formatter = locale === 'zh_CN' ? 'YYYY-MM-DD A h:mm:ss' : 'YYYY-MM-DD hh:mm:ss A';
  return dayjs(date).format(formatter);
}

export const formatToDate = formatDate;
export const dateUtil = dayjs;
