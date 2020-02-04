const path = require('path');

module.exports = {
  entry: './src/components/virusMap/hierarchicalVirusMap.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'component.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js?$/,
        loader: [
          'babel-loader'
        ]
      },
      {
        test: /\.ts?$/,
        use: [
          'awesome-typescript-loader'
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader'
        ],
      }
    ]
  }
}