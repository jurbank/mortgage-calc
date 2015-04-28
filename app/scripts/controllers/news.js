'use strict';

angular.module('mortgageCalcApp')
	.controller('NewsCtrl', function($scope){
	
    var config5 = {
      "id": '592122115807129601',
      "domId": '',
      "maxTweets": 20,
      "enableLinks": true,
      "showUser": false,
      "showTime": true,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };

    function handleTweets(tweets){
      console.log(tweets.length);
        var x = tweets.length;
        var n = 0;
        var element = document.getElementById('twitter-feed');
        var html = '<ul class="container">';
        while(n < x) {
          html += '<li>' + tweets[n] + '</li>';
          n++;
        }
        html += '</ul>';
        element.innerHTML = html;

    }

    twitterFetcher.fetch(config5);

});