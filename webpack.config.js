const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode:'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: [
    './src/js/main.js'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
  new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

};