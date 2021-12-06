var express = require('express');
var router = express.Router();
var gravatar = require('gravatar');

var softwareController = require('../controllers/softwareController');

router.get('/', softwareController.hasAuthorization,
    softwareController.listTopItems);

router.get('/search', softwareController.hasAuthorization,
    softwareController.searchSoftware);

router.get('/:id', softwareController.hasAuthorization,
    softwareController.getSoftwareById)

module.exports = router;
