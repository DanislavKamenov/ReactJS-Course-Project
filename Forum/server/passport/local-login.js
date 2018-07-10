const generateWebToken = require('./generateWebToken');
const userService = require('../services/userService');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const user = {
        email: email.trim(),
        password: password.trim()
    };
    //TODO: Rework this validation.
    userService
        .getOne({email}, null, 'roles')
        .then(savedUser => {
            const isMatch = savedUser.authenticate(user.password);

            if (!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
          
                return done(error);
            }

            const isBanned = savedUser.isBanned;
            
            if (isBanned) {
                const error = new Error('Your account has been banned! Contact our support for more info!');
                error.name = 'IncorrectCredentialsError';
          
                return done(error);
            }

            const userToSend = {
                id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
                avatar: savedUser.avatar,
                roleNames: savedUser.roleNames,
                isAdmin: savedUser.isAdmin,
                isSilenced: savedUser.isSilenced,
                isBanned: savedUser.isBanned
            };
            const token = generateWebToken(userToSend);
          
            return done(null, token);
        })
        .catch(err => {
            console.log(err);
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
    
            return done(error);
        });    
});
