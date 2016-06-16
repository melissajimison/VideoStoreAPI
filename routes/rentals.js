var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals_controller.js');

/* GET customers listing. */
router.get('/:title', RentalsController.show);

/* GET customers details. */
// router.get('/:id', RentalsController.show);

module.exports = router;
