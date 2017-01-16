var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080,
    Cat = require('./app/models/cat');

var app = express();

mongoose.connect('mongodb://<user>:<pw>@ds111529.mlab.com:11529/merlin-game');

app.use(
  bodyParser.urlencoded({extended: true})
);
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'very nice'});
});

router.route('/cats')
  .post(function(req, res) {
      var cat = new Cat();
      cat.name = req.body.name;

      cat.save(function(err) {
        if(err) {
          res.send(err);
        }
        res.json({message: 'Cat created.'});
      });

  })
  .get(function (req, res) {
    Cat.find(function (err, cats) {
      if(err){
        res.send(err);
      }
      res.json(cats);
    });
  });

router.route('/cats/:cat_id')
  .get(function (req, res) {
    Cat.findById(req.params.cat_id, function(err, cat) {
      if(err) {
        res.send(err);
      }
      res.json(cat);
    });
  })
  .put(function(req, res) {
    Cat.findById(req.params.cat_id, function(err, cat) {
      if(err) {
        res.send(err);
      }
      cat.name = req.body.name;
      cat.save(function (err) {
        if(err) {
          res.send(err);
        }
        res.json({message: 'cat updated successfully.'});
      });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('port: ' + port);
