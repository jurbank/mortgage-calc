"use strict";angular.module("mortgageCalcApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/calculator.html",controller:"CalcCtrl"}).otherwise({redirectTo:"/"})}]),$(window).load(function(){$(".preloader-container").removeClass("js--show")}),angular.module("mortgageCalcApp").controller("CalcCtrl",["$scope",function(a){var b=$(".range-slider"),c=$(".slider-amount"),d=$(".slider-intrest"),e=$(".slider-term"),f=$(".input-amount"),g=$(".input-intrest"),h=$(".input-term");c.noUiSlider({start:[1e5],range:{min:[1e4,10],max:[1e6]},format:wNumb({decimals:0,mark:".",thousand:",",prefix:"$"})}),d.noUiSlider({start:[4],range:{min:[0],max:[20,1e3]},format:wNumb({decimals:2,mark:".",thousand:",",postfix:"%"})}),e.noUiSlider({start:[30],range:{min:[10,10],"25%":[15,10],"50%":[20,10],"75%":[25,10],max:30},format:wNumb({postfix:" Years"})});var i,j,k,l,m=wNumb({}),n=wNumb({}),o=wNumb({}),p=wNumb({decimals:0,mark:"",thousand:",",prefix:"$"}),q=function(){a.principal=m.from(c.val()),a.intrest=n.from(d.val()),a.term=o.from(e.val())},r=function(){a.principal=m.to(c.val()),a.intrest=n.to(d.val()),a.term=o.to(e.val()),a.breakdown=p.to(a.breakdown),a.totalPaid=p.to(a.totalPaid)},s=function(){q(),i=a.intrest/1200,j=12*a.term,k=Math.pow(i+1,j),l=a.principal*(i*k/(k-1)),a.breakdown=l,a.totalPaid=12*a.breakdown*a.term,a.termText=a.term,r()};f.change(function(){var b=$(this).val();c.val(b),a.principal=b,s(),a.$apply()}),g.change(function(){var b=$(this).val();d.val(b),a.intrest=b,s(),a.$apply()}),h.change(function(){var b=$(this).val();e.val(b),a.term=b,s(),a.$apply()}),c.Link("lower").to(f),d.Link("lower").to(g),e.Link("lower").to(h),s(),b.on({slide:function(){s(),a.$apply()}})}]);