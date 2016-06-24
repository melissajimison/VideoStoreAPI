var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({whatevs: 'whatevs!!!'});
});

router.get('/zomg', function(req, res, next) {
  res.status(200).json({it_works: 'it works!'});
});

router.get('/api/docs.json', IndexController.getJSON);

router.get('/api/docs', IndexController.getHTML);


module.exports = router;
