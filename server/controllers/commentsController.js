var Comment = require('../models/comments');
var Software = require('../models/software');
var mongoose = require('mongoose');

// Create Comments
exports.create = function (req, res) {
    var comment = new Comment(req.body);
    comment.user = req.user;
    var softwareId = req.body.softwareId;

    var isValidId = mongoose.Types.ObjectId.isValid(softwareId);

    if (!isValidId) {
        res.render('singleSoftware', {
            software: [],
        });
        return;
    }

    comment.save(function (error, data) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }

        Software.findOne({ _id: softwareId }).exec(function (err, software) {
            software.comments.push(comment);
            software.save();
            res.redirect('/softwares/' + req.body.softwareId);
        });
    });
};

// Comments authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};
