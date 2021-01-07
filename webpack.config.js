const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (_env, argv) {
  console.log(_env, argv);
  const isProduction = _env.production;
  const isDevelopment = !isProduction;
  console.log(isProduction);
  return {
    entry: path.resolve(__dirname, './src/index.js'),
    mode: isProduction ? 'production' : 'development',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Naviagtion',
        template: 'index.html',
      }),
    ],
    devServer: {
      port: 9000,
    },
  };
};
