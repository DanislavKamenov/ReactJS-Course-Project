const router = require('express').Router();
const userService = require('../services/userService');
const generateWebToken = require('../passport/generateWebToken');

function getAllUsers(req, res) {
    userService
        .get({ isAdmin: false })
        .then(users => {
            const usersToSend = users.map(u => (
                {
                    id: u._id,
                    email: u.email,
                    name: u.name,
                    isSilenced: u.isSilenced,
                    isBanned: u.isBanned
                }));

            res.status(200).json({
                success: true,
                users: usersToSend
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

function getUser(req, res) {
    const userId = req.body.userId;

    userService
        .getOne({ _id: userId })
        .then(user => {
            const userToSend = {
                id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                roleNames: user.roleNames,
                isAdmin: user.isAdmin,
                isSilenced: user.isSilenced,
                isBanned: user.isBanned
            };

            res.status(200).json({
                success: true,
                user: userToSend
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

function removeUser(req, res) {
    const userId = req.params.userId;

    userService
        .removeOne({_id: userId})
        .then(oldUser => {
            res.status(200).json({
                success: true,
                message: 'User Deleted'
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });        
}

function refreshUser(req, res) {
    const userId = req.params.userId;

    userService
        .getOne({ _id: userId })
        .then(user => {
            const userToSend = {
                id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                roleNames: user.roleNames,
                isAdmin: user.isAdmin,
                isSilenced: user.isSilenced,
                isBanned: user.isBanned
            };
            const token = generateWebToken(userToSend);

            res.status(200).json({
                success: true,
                token
            });                
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

function editCurrentUser(req, res) {
    const userId = req.params.userId;
    const userToUpdate = req.body;

    userService
        .update({ _id: userId }, userToUpdate, { new: true })
        .then(newUser => {
            const userToSend = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
                roleNames: newUser.roleNames,
                isAdmin: newUser.isAdmin,
                isSilenced: newUser.isSilenced,
                isBanned: newUser.isBanned
            };

            const token = generateWebToken(userToSend);

            res.status(200).json({
                success: true,
                token
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

function silenceUser(req, res) {
    const userId = req.params.userId;
    const isSilenced = req.body.isSilenced;

    userService.update({ _id: userId }, { isSilenced: isSilenced }, { new: true })
        .then(newUser => {
            const userToSend = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
                roleNames: newUser.roleNames,
                isAdmin: newUser.isAdmin,
                isSilenced: newUser.isSilenced,
                isBanned: newUser.isBanned
            };

            res.status(200).json({
                success: true,
                newUser: userToSend
            });
        }
        )
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

function banUser(req, res) {
    const userId = req.params.userId;
    const isBanned = req.body.isBanned;

    userService.update({ _id: userId }, { isBanned: isBanned }, { new: true })
        .then(newUser => {
            const userToSend = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
                roleNames: newUser.roleNames,
                isAdmin: newUser.isAdmin,
                isSilenced: newUser.isSilenced,
                isBanned: newUser.isBanned
            };

            res.status(200).json({
                success: true,
                newUser: userToSend
            });
        }
        )
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
            console.log(err);
        });
}

router
    .get('/', getAllUsers)
    .get('/:userId', getUser)
    .delete('/:userId', removeUser)
    .get('/:userId/token', refreshUser)
    .post('/currentUser/:userId', editCurrentUser)
    .post('/silence/:userId', silenceUser)
    .post('/ban/:userId', banUser);

module.exports = router;