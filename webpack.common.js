const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, 'src', 'client');
const nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
  entry: path.join(sourcePath, 'app.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.client.json'
          }
        },
        include: sourcePath,
        exclude: nodeModulesPath,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html'
    })
  ]
};