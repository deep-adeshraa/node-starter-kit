var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.get('/', adminController.hasAuthorization,
    adminController.listSoftwares);

router.post('/', adminController.hasAuthorization,
    adminController.createSoftware);

router.put('/:id', adminController.hasAuthorization,
    adminController.updateSoftwarae);

router.delete('/:id', adminController.hasAuthorization,
    adminController.deleteSoftware);

module.exports = router;
