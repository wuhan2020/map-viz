// 此文件为webpack打包组件时的配置

const path = require('path');

module.exports = {
  entry: './webpack.lib.entry.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './lib/'),
    filename: 'components.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: 'react',
    echarts: 'echarts',
  }
}