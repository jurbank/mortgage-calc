'use strict';

/**
 * @ngdoc function
 * @name mortgageCalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mortgageCalcApp
 */
angular.module('mortgageCalcApp')
  .controller('CalcCtrl', function ($scope) {

  	$scope.principal = 0;
  	$scope.intrest = 0;
  	$scope.term = 0;  	

		function findPayment(principal, intrest, term) {
			var payment = (principal * intrest) / (1 - Math.pow(1 + intrest, -term));
			return payment;
		}

		$scope.calcMortgage = function calcMortgage() {
			// console.log($scope.principal);
			// console.log('submitted');
			var pay = findPayment($scope.principal, $scope.intrest / 12, $scope.term * 12);
			console.log(pay);
		}
  });
