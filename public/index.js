/*jshint esversion:6*/
var view = (function(){
  "use strict";
  //following lab2/3 style
  var view = {};

  //load initial gui stuff
  window.onload = function() {
      doAjax('GET', '/last/fail', null,
      true, function(err, data){
            if (err) console.error(err);
            else {
              count(data.lastFail);
            }
        });
  };

  var count = function (lastfail) {
      console.log(lastfail);
      var timer = {
              showTime: function (cDisplay, timestamp) {
                  var now = new Date(),
  					time = new Date(now - Math.floor(timestamp));
                  cDisplay.html(time.getUTCHours() + ' hours ' + time.getUTCMinutes() + ' mins ' + time.getUTCSeconds() + ' secs');
                  setTimeout(function () {timer.showTime(cDisplay, timestamp);}, 1000);
              }
          };
      timer.showTime($('#el'), lastfail);
  };

  view.reset = function() {
    doAjax('POST', '/reset/fail', {}, true, function(err, data) {
      location.reload();
    });
  }

  /*from thiery's lab5 code*/
  var doAjax = function (method, url, body, json, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(e){
        switch(this.readyState){
             case (XMLHttpRequest.DONE):
                if (this.status === 200) {
                    if (json) return callback(null, JSON.parse(this.responseText));
                    return callback(null, this.responseText);
                }else{
                    return callback(this.responseText, null);
                }
        }
    };
    xhttp.open(method, url, true);
    if (json) xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send((body)? JSON.stringify(body) : null);
  };

  return view;
}());
