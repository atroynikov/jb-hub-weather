const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');


const webpackConfig = () => ({
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@actions": path.resolve('./src/actions'),
            "@components": path.resolve('./src/components'),
            "@containers": path.resolve('./src/containers'),
            "@reducers": path.resolve('./src/reducers'),
            "@sagas": path.resolve('./src/sagas'),
            "@selectors": path.resolve('./src/selectors')
        }
    },
    output: {
        path: path.resolve(__dirname, './target'),
        filename: 'index.js'
    },
    module: {
        rules: [
            ...ringUiWebpackConfig.config.module.rules,
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
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
                test: /\.less$/,
                loader: 'less-loader'
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'node_modules/chai-as-promised'),
                    path.join(__dirname, './src')
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