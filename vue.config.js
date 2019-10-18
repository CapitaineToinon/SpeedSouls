module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/scss/variables.scss";`
      }
    }
  }
};
