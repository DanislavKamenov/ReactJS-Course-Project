const PassportLocalStrategy = require('passport-local').Strategy;
const userService = require('../services/userService');
const roleService = require('../services/roleService');
const generateWebToken = require('./generateWebToken');

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',    
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const user = {
        email: email.trim(),
        password: password.trim(),        
        name: req.body.name.trim(),
        avatar: req.body.avatar.trim()
    };
    //TODO: rework this validation.
    userService
        .getOne({email})
        .then(() => {
            return done('E-mail already exists!');
        })
        .catch(err => {            
            if (err.message === 'User does not exist!') {
                roleService
                    .getOne({name: 'User'})
                    .then(role => {                        
                        user.roles = [role._id],
                        userService
                            .create(user)
                            .then((savedUser) => {
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
                                let token = generateWebToken(userToSend);
                                done(null, token);
                            })
                            .catch(err => done(err));
                    });
            } else {
                return done(err);
            }         
        });    
});
