var webpack = require('webpack');
 
module.exports = {
  entry: './frontend/dev/jsx/main.js',
  output: { path: "./frontend/static/scripts/js/", filename: 'app.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            plugins: ['transform-decorators-legacy', 'transform-class-properties'],
            presets: ['es2016', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
};
