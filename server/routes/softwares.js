var express = require('express');
var router = express.Router();
var gravatar = require('gravatar');

var softwareController = require('../controllers/softwareController');

router.get('/', softwareController.hasAuthorization,
    softwareController.listTopItems);

router.get('/search', softwareController.hasAuthorization,
    softwareController.searchSoftware);

module.exports = router;
