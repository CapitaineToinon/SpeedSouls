import formatDate from 'date-fns/format';

export default function date(value, format = 'do MMM yyyy') {
  return formatDate(new Date(value), format);
}
