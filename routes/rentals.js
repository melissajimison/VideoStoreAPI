var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals_controller.js');

/* GET rentals listing by title. */
// Look a movie up by title to see (/rentals/Jaws)
router.get('/:title', RentalsController.find_movie);
/* GET customers details. */
// router.get('/:id/current', RentalsController.current);

module.exports = router;
