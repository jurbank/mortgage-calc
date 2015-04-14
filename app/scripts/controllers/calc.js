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

		function findPayment(principal, intrest, term) {
			var payment = (principal * intrest) / (1 - Math.pow(1 + intrest, -term));
			return payment;
		}

		$scope.calcMortgage = function calcMortgage(a) {
			// console.log($scope.principal);
			// console.log('submitted');
			var pay = findPayment($scope.principal, $scope.intrest / 12, $scope.term * 12);
			console.log($scope.principal);
			console.log(a);
		}




// 'use strict';


var sliders = $('.range-slider');
var sliderAmount = $('.slider-amount');
var sliderIntrest = $('.slider-intrest');
var sliderTerm = $('.slider-term');

var inputAmount = $('.input-amount'), guard = false;
var inputIntrest = $('.input-intrest'), guard = false;
var inputTerm = $('.input-term'), guard = false;

function setSalesValue(value){
    if ( guard ) return;
    $(this).val(value);
}

sliderAmount.noUiSlider({
    start: [ 90000 ],
    range: {
    'min': [ 0, 1000 ],
    // '33%': [ 1000, 1000 ],
    // '66%': [ 5000, 1000 ],
    'max': [ 1000000, 1000 ]
		},
    format: wNumb({
        decimals: 0,
        mark: '.',
        thousand: ',',
        prefix: '$'
    })     
});


// $apply on init??

sliderIntrest.noUiSlider({
    start: [ 2 ],
    range: {
    'min': [ 0 ],
    // '33%': [ 1000, 1000 ],
    // '66%': [ 5000, 1000 ],
    'max': [ 20, 1000 ]
		},
    format: wNumb({
        decimals: 2,
        mark: '.',
        thousand: ',',
        postfix: '%'
    })     
});

sliderTerm.noUiSlider({
    start: [ 10 ],
    range: {
    'min': [10, 10],
    '20%': [ 15, 10 ],
    '40%': [ 20, 10 ],
    '60%': [ 25, 10 ],
    '80%': [ 30, 10 ],
    'max': 40
		},
    format: wNumb({
        // decimals: 2,
        // mark: '.',
        thousand: ',',
        postfix: ' Years'
    })
});



// sliderAmount.noUiSlider_pips({
//     mode: 'positions',
//     values: [0,33,66,100],
//     density: 4,
//     stepped: true
// });

$('.slider-amount').Link("lower").to(inputAmount, setSalesValue);
$('.slider-intrest').Link("lower").to(inputIntrest, setSalesValue);
$('.slider-term').Link("lower").to(inputTerm, setSalesValue);

inputAmount.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});

inputIntrest.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});

inputTerm.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});



// UNFORMAT FOR USAGE
var unFormatAmount = wNumb({
  decimals: 0,
  mark: '.',
  thousand: ',',
  prefix: '$'
});

var unFormatIntrest = wNumb({
  decimals: 2,
  mark: '.',
  thousand: ',',
  postfix: '%'
});

var unFormatTerm = wNumb({
    thousand: ',',
    postfix: ' Years'
});


// sliderAmount.on({
// 	slide: function() {
// 	   $scope.principal = sliderAmount.val();
// 	   // $scope.breakdown = ($scope.principal * $scope.intrest) / $scope.term;
// 	   $scope.intrest = sliderIntrest.val();
// 	   $scope.breakdown = $scope.intrest;
// 	   // console.log($scope.principal);
// 	   $scope.$apply();
// 	}
// });


var r, numPayments, r2, monthlyPayment;

	sliders.on({
		slide: function() {
			// UNFORMAT FOR USAGE
		   $scope.principal = unFormatAmount.from(sliderAmount.val());
		   $scope.intrest = unFormatIntrest.from(sliderIntrest.val());
           $scope.term = unFormatTerm.from(sliderTerm.val());

            r = $scope.intrest/(100*12);
            numPayments = $scope.term*12;
            r2 = Math.pow(r+1, numPayments);
            monthlyPayment = $scope.principal * ((r * r2 )/(r2-1));           

		   $scope.breakdown = monthlyPayment;

		   // REFORMAT
		   $scope.principal = unFormatAmount.to(sliderAmount.val());
		   $scope.intrest = unFormatIntrest.to(sliderIntrest.val());

		   $scope.breakdownFormat = unFormatAmount.to( $scope.breakdown );
		   $scope.$apply();
		}
	});


    $scope.principal = sliderAmount.val();
    $scope.intrest =  sliderIntrest.val();
    $scope.term = sliderTerm.val();
    $scope.breakdown = 0;


    // var p = 200000;
    // var r = (6.5/12)/100
    // var l = 30*12


    // var term = 30;
    // var principal = 2000000;
    // var intrest = 6.5;

    // var r = intrest/(100*12);
    // var numPayments = term*12;
    // var r2 = Math.pow(r+1, numPayments);
    // var monthlyPayment = principal * ((r * r2 )/(r2-1));

//http://math.stackexchange.com/questions/664029/whats-the-math-formula-that-is-used-to-calculate-the-monthly-payment-in-this-mo



    // ((6.5 / 100 / 12) * 200000) / (1 - ((1 + (6.5 / 100 / 12)) ^ (-30 * 12)))




  });
