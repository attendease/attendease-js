module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine-ajax', 'jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
