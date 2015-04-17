'use strict';

angular
  .module('mortgageCalcApp', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'CalcCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
