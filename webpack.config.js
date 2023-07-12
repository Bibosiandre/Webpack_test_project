const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* const MiniCSSPlugin = require('mini-css-extract-plugin') */
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
    const config = {splitChunks: {
        chunks: 'all'
    }
}
if (isProd){
    config.minimizer = [
        new OptimizeCssPlugin(),
        new TerserPlugin()
    ]
}
return config
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode:'development',
    entry: {
        main: ['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json','.jpg'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer:{
        port:4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({template: './index.html', minify:{collapseWhitespace:isProd}}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src/styles/2.ico'),
                to: path.resolve(__dirname, 'dist')
              }
            ]
          })
    ],
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'images/[name][ext]'
                }
              },
              {
                test: /\.(ttf|woff|eot|woff2)$/,
                use: ['file-loader']
              },
              {
                test: /\.xml$/,
                use:['xml-loader']
              },
              {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins:['@babel/plugin-proposal-class-properties']
                }
              },
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env','@babel/preset-typescript'],
                  plugins:['@babel/plugin-proposal-class-properties']
                }
              },
              {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-react'],
                  plugins:['@babel/plugin-proposal-class-properties']
                }
              },
            ]
          }
}