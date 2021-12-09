var Software = require('../models/software');
var mongoose = require('mongoose')
var gravatar = require('gravatar');

// List top rated softwares
exports.listTopItems = function (req, res) {
    Software.find().sort('-rating').limit(10).exec(function (error, softwares) {
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

    if (!isValidId) {
        res.render('singleSoftware', {
            software: [],
        });
        return;
    }

    Software.findOne({ _id: objId }).populate({
        path: 'comments',
        populate: {
            path: 'user',
            model: 'User'
        },
        options: { sort: { 'created': -1 } }
    }).exec(function (error, data) {
        if (error) {
            console.log(error)
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
                { s: '80', r: 'x', d: 'retro' }, true),
        });
    });
}

exports.compareSoftware = function (req, res) {
    var softwareOne = req.query.softwareOne;
    var softwareTwo = req.query.softwareTwo;

    Software.findOne({ _id: softwareOne }).exec(function (error, software) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        softwareOne = software;

        Software.findOne({ _id: softwareTwo }).exec(function (error, software) {
            if (error) {
                return res.send(400, {
                    message: error
                });
            }

            softwareTwo = software;

            res.render('compareSoftware', {
                title: 'Compare Software Page',
                softwareOne: softwareOne,
                softwareTwo: softwareTwo,
                gravatarOne: gravatar.url(softwareOne.name,
                    { s: '80', r: 'x', d: 'retro' }, true),
                gravatarTwo: gravatar.url(softwareTwo.name,
                    { s: '80', r: 'x', d: 'retro' }, true)

            });
        });
    });
}

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role == 1)
        return next();
    res.redirect('/login');
};