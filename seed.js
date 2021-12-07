const User = require('./server/models/user');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
var dbConfig = require('./server/config/config.js');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("mongoose connected")).catch(err => console.log(err));

function createUser() {
    var user = new User();
    user.local.name = "name";
    user.local.email = "name@name.com";
    var password = "password";
    // You can add `user.role = 0` here to change it to admin
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    user.save((err) => {
        console.log(err)
        return;
    });
}

createUser();
console.log('user created')
process.exit()