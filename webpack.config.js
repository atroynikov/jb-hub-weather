const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'target')
    },
    module: {
        rules: [
            ...ringUiWebpackConfig.config.module.rules,
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:7]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                loader: 'less-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
    ],
    devServer: {
        port: 8443,
        https: {
            key: fs.readFileSync('./localhost.key'),
            cert: fs.readFileSync('./localhost.crt')
        },
        host: 'localhost.troynikov.com',
        contentBase: path.join(__dirname, 'target'),
        compress: true,
        hot: false,
        hotOnly: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};