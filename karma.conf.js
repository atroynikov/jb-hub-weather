module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './test-bundler.js'
    ],
    exclude: [],
    preprocessors: {
      './test-bundler.js': ['webpack', 'sourcemap']
    },
    webpack: Object.assign({}, require('./webpack.config.js')(), {
      devtool: 'inline-source-map',
      entry: null,
      externals: {
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
        'react-addons-test-utils': 'window'
      }
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: 'progress',
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Electron'],
    electronOpts: {
      show: false,
      skipTaskbar: true,
      height: 1024,
      width: 768,
      webPreferences: {
        pageVisibility: true
      }
    },
    singleRun: true
  });
};
