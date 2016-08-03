var webpack = require('webpack');

module.exports = {
  entry: "./client/assets/js/main.js",
  output: {
    path: "./client/public/js",
    filename: "main.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  watch: true,
  devtool: "source-map"
};
