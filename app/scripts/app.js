'use strict';

/**
 * @ngdoc overview
 * @name mortgageCalcApp
 * @description
 * # mortgageCalcApp
 *
 * Main module of the application.
 */
angular
  .module('mortgageCalcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        // templateUrl: 'views/main.html',
        controller: 'CalcCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
