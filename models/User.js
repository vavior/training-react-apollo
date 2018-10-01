const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        // array of all the ids provided by our DB
        // array of ids with a reference to the "Recipe" model
        // we'll use a method from mongoDB, called 'populate', that will change these ids by the recipes' objects themselves
        type: [Schema.Types.ObjectId],
        ref: 'Recipe'
    }
});


// This method enables to run a function before the User is saved to the DB.
UserSchema.pre('save', function(next) {
    // If the password hasn't been modified, please exirt this function and run the next one because we're not signing up a user.
    if(!this.isModified('password')) return next();

    // 1st arg: default = 10 (= cost of processing the data),
    // 2nd arg: callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // 1st arg: data to be encrypted
        // 2nd arg: the salt to be used in the encryption
        // 3d arg: callback
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // asign the hash to the password
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);