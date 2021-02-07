import { formatDistanceStrict } from 'date-fns';

export default function relativeDate(value) {
  return formatDistanceStrict(new Date(value), new Date());
}
