import { formatDistanceStrict, subDays } from 'date-fns';

export default function relativeDate(value) {
  return formatDistanceStrict(subDays(new Date(value), 3), new Date());
}
