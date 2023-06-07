const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.route('/').get(viewsController.getOverview);
router.route('/tour').get(viewsController.getTour);

module.exports = router;
