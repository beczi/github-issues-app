const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { SRC, DIST, ASSETS } = require('./paths')

module.exports = {
  entry: {
    scripts: path.resolve(SRC, 'js', 'index.js')
  },
  output: {
    // Put all the bundled stuff in your dist folder
    path: DIST,

    // Our single entry point from above will be named "scripts.js"
    filename: '[name].js',

    // The output path as seen from the domain we're visiting in the browser
    publicPath: ASSETS
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: ['css-loader?url=false', 'sass-loader']
       })
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(__dirname, 'dist/assets/images'),
        loader: 'url-loader?limit=10000'
     }
    ]
  },
  plugins: [
   new ExtractTextPlugin('style.css')
 ]

}
