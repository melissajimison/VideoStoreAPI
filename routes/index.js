var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'});
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({it_works: 'it works!'});
});

module.exports = router;
