const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/items_controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  ItemsController.index(req, res, next)
});

module.exports = router;
