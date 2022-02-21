const path = require('path'),
  Uglify = require("uglifyjs-webpack-plugin"),
  autoprefixer = require('autoprefixer'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, "./src/js/index.js"),
    jquery: path.resolve(__dirname, "./src/js/jquery.min.js")
  },
  output: {
    path: path.resolve(__dirname, "/public"),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugin() {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          'sass-loader'
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugin() {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/i,
        exclude: /node_modules/,
        loader: 'url-loader?limit=2048&name=img/[name]-[hash:16].[ext]',
      },
      {
        test: /\.(woff2?|eto|ttf|otf|eot|svg)(\?.x)$/i,
        exclude: /node_modules/,
        loader: 'url-loader?name=fonts/[name].[ext]',
      }
    ]
  },
  plugins: [
    new Uglify(),
    new OptimizeCssAssetsWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  devServer: {
    watchOptions: {
      ignoreed: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 3300
  }
}
module.exports = config