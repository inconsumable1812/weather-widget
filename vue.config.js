const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/weather-widget/' : '/',
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  }
});
