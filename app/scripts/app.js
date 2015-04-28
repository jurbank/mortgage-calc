'use strict';

angular
  .module('mortgageCalcApp', [
    'ngRoute',
    // 'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/calculator.html',
        controller: 'CalcCtrl'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
