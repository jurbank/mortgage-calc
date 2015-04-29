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
      .otherwise({
        redirectTo: '/'
      });
  });

$(window).load(function(){
  $('.preloader-container').removeClass('js--show');
});