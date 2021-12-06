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

// Search software
exports.searchSoftware = function (req, res) {
    var query = req.query

    Software.find({tag: { $regex: "^" + query.searchQuery } })
        .sort('-rating').exec(function (error, softwares) {
            if (error) {
                return res.send(400, {
                    message: error
                });
            }
            console.log(softwares)

            res.render('softwares', {
                title: 'Software Page',
                softwares: softwares,
                searchQuery: query.searchQuery
            });
        });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};