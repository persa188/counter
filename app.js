var express = require('express'),
  app = express(),
  path = require('path'),
  Datastore = require('nedb'),
  bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));

//nedb conf
var counter = new Datastore({ filename: 'db/counter.db',
  autoload: true,
  timestampData: true
});

var Count = function(timestamp) {
  this.lastFail = timestamp;
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

app.get('/last/fail', function(req, res) {
  counter.findOne({}).sort({createdAt:-1}).exec(function(err, data) {
    if (err) res.status(500).end(JSON.stringify({"response":"server err"}));
    res.status(200).end(JSON.stringify(data));
  });
});

app.post('/reset/fail', function(req, res) {
  counter.insert({lastFail: Date.now()},function(err, doc) {
    if (err) res.status(500).end(JSON.stringify({"response":"server err"}));
    res.status(200).end(JSON.stringify(doc));
  });
});

app.use(express.static('public'));

app.listen(3000, function(){
  console.log("app listening on port 3000");
});
