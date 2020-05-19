// Webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin= require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');




module.exports = {
  entry: [
     './src/index.js',
     './src/main.scss',
   ] ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js',
  },
  module: {

    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader', 
        }
      },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            }, 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img',
              name: '[name].[ext]',
            }
          },

          ]
      },
     {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: [ 'html-loader',]
      },

    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/img',
        to: './img'
      },

    ]}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './style.[contenthash].css',

    }
    ),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '60-70'
      },
      plugins: [imageminMozjpeg({quality: 60})]
    })
  ]
};