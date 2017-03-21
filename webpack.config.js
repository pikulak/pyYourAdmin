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
            plugins: ['transform-decorators-legacy',
                      'transform-class-properties',
                      'transform-es2015-arrow-functions',
                      'transform-es2015-template-literals'],
            presets: ['es2016', 'react', 'stage-0']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
};
