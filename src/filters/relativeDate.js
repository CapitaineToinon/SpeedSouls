import Vue from 'vue';
import { formatDistanceStrict, subDays } from 'date-fns';

Vue.filter('relativeDate', function(value) {
  return formatDistanceStrict(subDays(new Date(value), 3), new Date());
});
