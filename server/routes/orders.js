const ordersController = require("../controllers/orders.js");
const express = require('express');
const router = express.Router();

router.post('/items/:email/:title/:action',ordersController.updateItems);
router.post('/order/new/:email',ordersController.newOrder);

module.exports = router;