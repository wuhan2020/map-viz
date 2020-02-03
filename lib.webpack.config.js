const path = require('path');

module.exports = {
  entry: './src/components/index.js',
  output: {
    filename: 'map-viz.js',
    path: path.join(__dirname, '/lib/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.ts?$/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  }
};