var Software = require('../models/software');

exports.listSoftwares = function (req, res) {
    Software.find().exec(function (error, softwares) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        res.render('admin', {
            title: 'Admin Page',
            softwares: softwares,
        });
    });
};

exports.createSoftware = function (req, res) {
    var newSoftware = new Software();

    if (!(req.body.name && req.body.tag && req.body.details)) {
        return res.redirect('/admin');
    }

    newSoftware.name = req.body.name;
    newSoftware.tag = req.body.tag;
    newSoftware.details = req.body.details;

    newSoftware.save(function (error) {
        return res.redirect('/admin');
    });
};

exports.deleteSoftware = function (req, res) {
    var id = req.query.deleteSoftwareId;

    Software.findOne({ _id: id }).remove(function (error) {
        return res.redirect('/admin');
    });
};

exports.updateSoftwarae = function (req, res) {
};

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == 0) {
            return next();
        } else {
            res.redirect('/profile');
        }
    }

    res.redirect('/login');
};