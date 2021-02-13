const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const plugins = [
    new HtmlWebPackPlugin({
      template: sourcePath + '/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
      chunkFilename: '[id].[contenthash:4].css'
    }),
    new ForkTsCheckerWebpackPlugin()
  ];

  if (isProd) {
    plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\/environments\/environment\.ts/, `${sourcePath}/environments/environment.prod.ts`
      ),
      new UglifyJsPlugin({
        sourceMap: true
      })
    );
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  const config = {
    entry: {
      app: sourcePath + '/main.ts',
    },
    output: {
      path: distPath,
      filename: '[name].bundle.[hash:4].js',
      publicPath: '',
    },
    module: {
      rules: [{
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader']
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [{
              loader: 'ng-annotate-loader',
              options: {
                ngAnnotate: 'ng-annotate-patched',
                sourcemap: !isProd,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: sourcePath + '/tsconfig.app.json',
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            publicPath:'./'
          }
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath:'./'
          }
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    // devtool: 'eval-source-map',
    devServer: {
      host: 'localhost',
      port: 9000,
      contentBase: distPath,
      hot: true
    }
  };

  if (!isProd) {
    config.devtool = 'source-map';
  }

  return config;
};
