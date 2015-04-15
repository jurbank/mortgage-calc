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

    var sliders = $('.range-slider');
    var sliderAmount = $('.slider-amount');
    var sliderIntrest = $('.slider-intrest');
    var sliderTerm = $('.slider-term');

    var inputAmount = $('.input-amount'), guard = false;
    var inputIntrest = $('.input-intrest'), guard = false;
    var inputTerm = $('.input-term'), guard = false;


    sliderAmount.noUiSlider({
        start: [ 100000 ],
        range: {
        'min': [ 0, 1000 ],
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
        start: [ 4.5 ],
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
        start: [ 30 ],
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

    $('.slider-amount').Link("lower").to(inputAmount);
    $('.slider-intrest').Link("lower").to(inputIntrest);
    $('.slider-term').Link("lower").to(inputTerm);


    inputAmount.change(function(){
        var value = $(this).val();
        guard = true;
        sliderAmount.val(value);
        guard = false;
    });

    inputIntrest.change(function(){
        var value = $(this).val();
        guard = true;
        sliderIntrest.val(value);
        guard = false;
    });

    inputTerm.change(function(){
        var value = $(this).val();
        guard = true;
        sliderTerm.val(value);
        guard = false;
    });



    // UNFORMAT FOR USAGE
    var unFormatAmount = wNumb({
      // decimals: 0,
      // mark: '.',
      // thousand: ',',
      // prefix: '$'
    });

    var unFormatIntrest = wNumb({
      // decimals: 2,
      // mark: '.',
      // thousand: ',',
      // postfix: '%'
    });

    var unFormatTerm = wNumb({
        // thousand: ',',
        // postfix: ' Years'
    });

    var unFormatBreakdown = wNumb({
      decimals: 0,
      mark: '',
      thousand: ',',
      prefix: '$'
    });

    var r, numPayments, r2, monthlyPayment;

    var calcPayment = function() {

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
       $scope.breakdown = unFormatBreakdown.to($scope.breakdown);
       $scope.$apply();
    }

    calcPayment();

    // maybe after init load, unformat again for sliding

    sliders.on({
    	slide: function() {
            calcPayment();
    	}
    });


    $scope.principal = sliderAmount.val();
    $scope.intrest =  sliderIntrest.val();
    $scope.term = sliderTerm.val();
    // $scope.breakdown = $scope.breakdown;

});
