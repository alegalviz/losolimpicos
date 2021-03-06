// Karma configuration
// Generated on 2016-03-08

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/pym.js/dist/pym.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/scrollreveal/dist/scrollreveal.js',
      'bower_components/jquery-cycle/jquery.cycle.all.js',
      'bower_components/maximage/lib/js/jquery.maximage.js',
      'bower_components/chartist/dist/chartist.min.js',
      'bower_components/angular-chartist.js/dist/angular-chartist.js',
      'bower_components/slick-carousel/slick/slick.js',
      'bower_components/angular-slick-carousel/dist/angular-slick.js',
      'bower_components/chartist-plugin-tooltip/dist/chartist-plugin-tooltip.min.js',
      'bower_components/Chart.js/dist/Chart.js',
      'bower_components/randomcolor/randomColor.js',
      'bower_components/fullpage.js/vendors/scrolloverflow.min.js',
      'bower_components/fullpage.js/dist/jquery.fullpage.js',
      'bower_components/fullpage.js/vendors/jquery.easings.min.js',
      'bower_components/parallax/deploy/parallax.js',
      'bower_components/parallax/deploy/parallax.min.js',
      'bower_components/parallax/deploy/jquery.parallax.js',
      'bower_components/parallax/deploy/jquery.parallax.min.js',
      'bower_components/PACE/pace.js',
      'bower_components/recliner/recliner.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
