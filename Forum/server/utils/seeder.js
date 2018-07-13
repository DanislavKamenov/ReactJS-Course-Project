const Role = require('../models/Role');
const User = require('../models/User');
const categoryService = require('../services/categoryService');

module.exports = {
    seedRolesAndAdmin: () => {
        return new Promise((resolve, reject) => {
            Role
                .insertMany([{ name: 'Admin' }, { name: 'User' }])
                .then((roles) => {
                    console.log('Roles Seeded!');

                    let admin = {
                        email: 'admin@admin.bg',
                        name: 'Admin',
                        password: '123',
                        roles: [roles[0]._id, roles[1]._id]
                    };

                    User
                        .create(admin)
                        .then((user) => {
                            console.log('Admin seeded!');
                            let categories = [
                                { creator: user._id, name: 'News', icon: 'https://cdn4.iconfinder.com/data/icons/academic-disciplines-color-sticker/64/current-events-512.png', description: 'Daily news from our moderators.', editAccess: 'Admin' },
                                { creator: user._id, name: 'General Discussion', icon: 'https://static.memrise.com/uploads/things/images/37546163_140818_1021_49.png', description: 'Discuss interesting topics with other users.' },
                                { creator: user._id, name: 'Support', icon: 'https://t3.ftcdn.net/jpg/00/30/80/68/500_F_30806890_7RjFFHE5clHmDURkzU1aaQSifqgDQwLN.jpg', description: 'Get help from our staff.' },
                            ];
                            categoryService.create(categories)
                                .then(categories => {
                                    console.log('Categories seeded!');
                                    resolve(user);
                                })
                                .catch(reject);

                        }).catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                });

        });
    },
    seedUser(email, name, pwd, newRoles) {
        Role.find({ name: { $in: newRoles } })
            .then(roles => {
                let normalUser = {
                    email: email,
                    name: name,
                    password: pwd,
                    roles: roles.map(r => r._id)
                };

                User
                    .create(normalUser)
                    .then((user) => {
                        console.log(`${user.name} seeded!`);
                    }).catch(err => {
                        console.log(err);
                    });

            });
    }
};