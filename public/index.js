/*jshint esversion:6*/
var view = (function(){
  "use strict";
  //following lab2/3 style
  var view = {};
  var integ_st = document.getElementById('integ_status');

  //load initial gui stuff
  window.onload = function() {
      doAjax('GET', '/api/status', null,
      true, function(err, data){
            if (err) console.error(err);
            else {
              set_status(data.status)
              sessionStorage.setItem("status", data.status)
              count(data.tstmp);
            }
        });
  };

  var count = function (t) {
      console.log(t);
      var timer = {
              showTime: function (cDisplay, timestamp) {
                  var now = new Date(),
  					time = new Date(now - Math.floor(timestamp));
                  cDisplay.html(time.getUTCHours() + ' hours ' + time.getUTCMinutes() + ' mins ' + time.getUTCSeconds() + ' secs');
                  setTimeout(function () {timer.showTime(cDisplay, timestamp);}, 1000);
              }
          };
      timer.showTime($('#el'), t);
  };

  var set_status = function (st) {
    if (st == "broken") {
      integ_st.innerHTML= "failing"
      integ_st.className = "failing";
    } else if (st == "passing") {
      integ_st.innerHTML= "passing"
      integ_st.className = "passing";
    } else {
      integ_st.innerHTML = "unkown"
    }
  }

  view.toggle_status = function() {
    var st = sessionStorage.getItem('status')
    if (st == 'broken') st = 'passing';
    else st = 'broken';
    doAjax('POST', '/api/status', {status: st}, true, function(err, data) {
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
