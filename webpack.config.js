'use strict';
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var config = {
  cache: true,
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: path.join(__dirname, './assets/'),
    publicPath: '/assets/',
    filename: 'js/[name].bundle.js'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      chunks: ['app'],
      minChunks: 2
    }),
    new ExtractTextPlugin("/css/style.css"),
    new CopyWebpackPlugin([
      { from: 'src/fonts', to: 'fonts' },
    ], {
      ignore: ['*.txt']
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../'
          }
        },
      },
      {
        // for some modules like foundation
        test: /\.scss$/,
        exclude: [/node_modules/], // sassLoader will include node_modules explicitly
        loader: ExtractTextPlugin.extract({ 
          fallback: "style-loader", 
          use: [
            "css-loader", 
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: function(loader) {
                  return [autoprefixer];
                },
                config: {
                  ctx: {
                    autoprefixer: {browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}
                  }
                }
              }
            },
            {
              loader: "sass-loader",
              query: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            },
          ] 
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(["css-loader"])
      }
    ]
  },
  profile: true,
  stats: {
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    modules: true,
    reasons: true,
    children: true,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  }
};

module.exports = config;
