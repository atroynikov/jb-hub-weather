const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const srcPath = path.join(__dirname, './src');

const webpackConfig = () => ({
  entry: path.resolve('./src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      "@actions": path.resolve('./src/actions'),
      "@components": path.resolve('./src/components'),
      "@constants": path.resolve('./src/constants'),
      "@containers": path.resolve('./src/containers'),
      "@reducers": path.resolve('./src/reducers'),
      "@sagas": path.resolve('./src/sagas'),
      "@selectors": path.resolve('./src/selectors'),
      "@utils": path.resolve('./src/utils')
    }
  },
  output: {
    path: path.resolve(__dirname, './target'),
    filename: 'index.js'
  },
  stats: "verbose",
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:7]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {variables: require('@jetbrains/ring-ui/extract-css-vars')}
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'node_modules/chai-as-promised'),
          srcPath
        ],
        loader: 'babel-loader?cacheDirectory'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './public/index.html',
        to: './'
      },
      {
        from: './public/manifest.json',
        to: './'
      }
    ])
    // ,new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // })
  ],
  devServer: {
    port: 8443,
    https: {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt')
    },
    host: 'localhost.troynikov.com',
    contentBase: path.join(__dirname, './target'),
    compress: true,
    hot: false,
    hotOnly: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

module.exports = webpackConfig;
