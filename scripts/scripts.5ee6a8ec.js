"use strict";angular.module("mortgageCalcApp",["ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{controller:"CalcCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("mortgageCalcApp").controller("CalcCtrl",["$scope",function(a){function b(a){j||$(this).val(a)}var c=$(".range-slider"),d=$(".slider-amount"),e=$(".slider-intrest"),f=$(".slider-term"),g=$(".input-amount"),h=$(".input-intrest"),i=$(".input-term"),j=!1;d.noUiSlider({start:[1e5],range:{min:[1e4,10],max:[1e6]},format:wNumb({decimals:0,mark:".",thousand:",",prefix:"$"})}),e.noUiSlider({start:[4],range:{min:[0],max:[20,1e3]},format:wNumb({decimals:2,mark:".",thousand:",",postfix:"%"})}),f.noUiSlider({start:[30],range:{min:[10,10],"25%":[15,10],"50%":[20,10],"75%":[25,10],max:30},format:wNumb({postfix:" Years"})}),g.change(function(){var a=$(this).val();j=!0,d.val(a),j=!1}),h.change(function(){var a=$(this).val();j=!0,e.val(a),u(),j=!1}),i.change(function(){var a=$(this).val();j=!0,f.val(a),u(),j=!1}),d.Link("lower").to(g,b),e.Link("lower").to(h,b),f.Link("lower").to(i,b);var k,l,m,n,o=wNumb({}),p=wNumb({}),q=wNumb({}),r=wNumb({decimals:0,mark:"",thousand:",",prefix:"$"}),s=function(){a.principal=o.from(d.val()),a.intrest=p.from(e.val()),a.term=q.from(f.val())},t=function(){a.principal=o.to(d.val()),a.intrest=p.to(e.val()),a.term=q.to(f.val()),a.breakdown=r.to(a.breakdown)},u=function(){s(),k=a.intrest/1200,l=12*a.term,m=Math.pow(k+1,l),n=a.principal*(k*m/(m-1)),a.breakdown=n,t()};u(),c.on({slide:function(){u(),a.$apply()}})}]);