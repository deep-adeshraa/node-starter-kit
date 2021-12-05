var gravatar = require('gravatar');
var Software = require('../models/software');

// List top rated softwares
exports.listTopItems = function (req, res) {
    Software.find().sort('-rating').exec(function (error, softwares) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        res.render('softwares', {
            title: 'Software Page',
            softwares: softwares,
            topSoftwares: true
        });
    });
};

// Create Comments
exports.searchSoftware = function (req, res) {
    var query = req

    res.render('softwares', {
        title: 'Software Page',
        softwares: softwares,
        topSoftwares: true
    });

};

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};