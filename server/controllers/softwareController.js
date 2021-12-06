var Software = require('../models/software');
var mongoose = require('mongoose')
var gravatar = require('gravatar');

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

    Software.find({ tag: { $regex: "^" + query.searchQuery } })
        .sort('-rating').exec(function (error, softwares) {
            if (error) {
                return res.send(400, {
                    message: error
                });
            }

            res.render('softwares', {
                title: 'Software Page',
                softwares: softwares,
                searchQuery: query.searchQuery
            });
        });
};

exports.getSoftwareById = function (req, res) {
    var objId = req.params.id;
    var isValidId = mongoose.Types.ObjectId.isValid(objId);
    console.log(isValidId)
    if (!isValidId) {
        res.render('singleSoftware', {
            software: [],
        });
        return;
    }

    Software.findOne({ _id: objId }).exec(function (error, data) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        if (data.length) {
            data = data[0];
        }

        res.render('singleSoftware', {
            title: 'Software Page',
            software: data,
            gravatar: gravatar.url(data.name,
                { s: '80', r: 'x', d: 'retro' }, true)
        });
    });
}

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};