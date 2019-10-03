import SpeedSouls from "./SpeedSouls";

export default {
  install: (Vue, options = {}) => {
    Vue.prototype.$speedsouls = SpeedSouls(options);
  }
};
