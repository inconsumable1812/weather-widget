const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/weather-widget/' : '/'
});
