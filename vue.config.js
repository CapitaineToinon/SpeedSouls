const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: true
  },
  publicPath: isProd ? '/SpeedSouls/' : '/'
};
