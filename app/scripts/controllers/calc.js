'use strict';

angular.module('mortgageCalcApp')
    .controller('CalcCtrl', function($scope) {

      var sliders = $('.range-slider');
      var sliderAmount = $('.slider-amount');
      var sliderIntrest = $('.slider-intrest');
      var sliderTerm = $('.slider-term');

      var inputAmount = $('.input-amount');
      var inputIntrest = $('.input-intrest');
      var inputTerm = $('.input-term'); 

      var guard = false;

      // ======================================
      // INIT 
      // ======================================

      sliderAmount.noUiSlider({
          start: [100000],
          range: {
            'min': [ 10000, 10 ],
            'max': [ 1000000 ]
          },
          format: wNumb({
            decimals: 0,
            mark: '.',
            thousand: ',',
            prefix: '$'
          })
      });

      sliderIntrest.noUiSlider({
          start: [4.0],
          range: {
            'min': [0],
            'max': [20, 1000]
          },
          format: wNumb({
              decimals: 2,
              mark: '.',
              thousand: ',',
              postfix: '%'
          })
      });

      sliderTerm.noUiSlider({
          start: [30],
          range: {
            'min': [10, 10],
            '25%': [15, 10],
            '50%': [20, 10],
            '75%': [25, 10],
            'max': 30
          },
          format: wNumb({
              postfix: ' Years'
          })
      });

      // ======================================
      // INPUT 
      // ======================================

      function specificVal(value) {
        if (guard) return;
        $(this).val(value);

      }

      inputAmount.change(function() {
        var value = $(this).val();        
        guard = true;
        sliderAmount.val(value);

        guard = false;
      });

      inputIntrest.change(function() {
        var value = $(this).val();
        guard = true;
        sliderIntrest.val(value);
        calcPayment();
        guard = false;
      });

      inputTerm.change(function() {
        var value = $(this).val();
        guard = true;
        sliderTerm.val(value);
        calcPayment();
        guard = false;
      });

      // ======================================
      // LINK SLIDER TO INPUT 
      // ======================================

      sliderAmount.Link("lower").to(inputAmount, specificVal);
      sliderIntrest.Link("lower").to(inputIntrest, specificVal);
      sliderTerm.Link("lower").to(inputTerm, specificVal);

      // ======================================
      // UNFORMAT
      // ======================================

      var unFormatAmount = wNumb({});
      var unFormatIntrest = wNumb({});
      var unFormatTerm = wNumb({});
      var unFormatBreakdown = wNumb({
          decimals: 0,
          mark: '',
          thousand: ',',
          prefix: '$'
      });

      var r, numPayments, r2, monthlyPayment;

      var unformat = function() {
          $scope.principal = unFormatAmount.from(sliderAmount.val());
          $scope.intrest = unFormatIntrest.from(sliderIntrest.val());
          $scope.term = unFormatTerm.from(sliderTerm.val());
      };

      var format = function() {
          $scope.principal = unFormatAmount.to(sliderAmount.val());
          $scope.intrest = unFormatIntrest.to(sliderIntrest.val());
          $scope.term = unFormatTerm.to(sliderTerm.val());
          $scope.breakdown = unFormatBreakdown.to($scope.breakdown);
      };

      // issue shows false (from formatting)
      var calcPayment = function() {
        unformat();

        r = $scope.intrest / (100 * 12);
        numPayments = $scope.term * 12;
        r2 = Math.pow(r + 1, numPayments);
        monthlyPayment = $scope.principal * ((r * r2) / (r2 - 1));

        $scope.breakdown = monthlyPayment;

        format();
      }

      calcPayment();

      sliders.on({
          slide: function() {
              calcPayment();
              $scope.$apply();
          }
      });

      // ======================================
      // TESTING
      // ======================================
});
