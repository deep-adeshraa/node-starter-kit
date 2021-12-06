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
};

exports.deleteSoftware = function (req, res) {
};

exports.updateSoftwarae = function(req, res) {
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