var express = require('express'),
  app = express(),
  path = require('path'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser'),
  moment = require('moment');

app.use(bodyParser.json({limit: '50mb'}));

//nedb conf
var status = new Datastore({ filename: 'db/status.db',
  autoload: true,
  timestampData: true
});

var Count = function(timestamp) {
  this.status = timestamp;
};

app.use(function (req, res, next){
    //for debugging only
    // console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

//intial redirect
app.get('/', function (req, res) {
  res.redirect('index.html');
});

app.get('/api/status', function(req, res) {
  status.findOne({}).sort({createdAt:-1}).exec(function(err, data) {
    if (err) res.status(500).end(JSON.stringify({"response":"server err"}));
    res.status(200).end(JSON.stringify(data));
  });
});

app.post('/api/status/', function(req, res) {
    status.insert({status: req.body.status, tstmp: moment.utc().valueOf()},function(err, doc) {
      if (err) res.status(500).end(JSON.stringify({"response":"server err"}));
      res.status(200).end(JSON.stringify(doc));
  });
});

app.use(express.static('public'));

app.listen(3000, function(){
  console.log("app listening on port 3000");
});
