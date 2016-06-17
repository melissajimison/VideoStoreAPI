var express = require('express');
var router = express.Router();
var CustomersController = require('../controllers/customers_controller.js');

/* GET customers listing. */
router.get('/', CustomersController.index);

// /* GET customers details. */
// router.get('/:id', CustomersController.show);

/* GET customers sorted by column details. */
router.get('/sort/:column', CustomersController.sort);

module.exports = router;
