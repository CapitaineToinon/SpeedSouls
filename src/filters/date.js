import Vue from "vue";
import formatDate from "date-fns/format";

Vue.filter("date", function(value, format = "do MMM yyyy") {
  return formatDate(new Date(value), format);
});
