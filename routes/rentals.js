var express = require('express');
var router = express.Router();
var RentalsController = require('../controllers/rentals_controller.js');

// GET overdue rentals
router.get('/overdue', RentalsController.overdue);

/* GET rentals listing by title. */
// Look a movie up by title to see (/rentals/Jaws)
router.get('/:title', RentalsController.find_movie);

/* GET customers details. */
router.get('/:title/customers', RentalsController.current_customers);

router.post('/:title/check-out/:id', RentalsController.checkout);

router.post('/:title/return/:id', RentalsController.return_a_rental);

module.exports = router;
