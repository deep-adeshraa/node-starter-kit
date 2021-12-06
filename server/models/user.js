var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

ADMIN = 0
USER = 1

var userSchema = mongoose.Schema({
    // Using local for Local Strategy Passport
    local: {
        name: String,
        email: String,
        password: String,
    },
    role: {type: Number, enum:{ADMIN, USER}, default: USER}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
