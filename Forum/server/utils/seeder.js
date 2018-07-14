const Role = require('../models/Role');
const User = require('../models/User');
const categoryService = require('../services/categoryService');
const PostService = require('../services/postService');
const commentService = require('../services/commentService');

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
                                    const newsPosts = [{
                                        creator: user._id,
                                        category: categories[0]._id,
                                        title: 'Weather Report',
                                        content: 'The weather will be sunny this week.',
                                    },
                                    {
                                        creator: user._id,
                                        category: categories[0]._id,
                                        title: 'World Events',
                                        content: 'USA bombing the middle east. Trying to steal oil.',
                                    }];
                                    const generalPost = {
                                        creator: user._id,
                                        category: categories[1]._id,
                                        title: 'World Cup',
                                        content: 'Who\'s watching the Worl Cup? Share your thoughts.'
                                    }

                                    Promise.all([PostService.create(newsPosts[0], categories[0]._id), PostService.create(newsPosts[1], categories[0]._id), PostService.create(generalPost, categories[1]._id)])
                                        .then(() => {
                                            console.log('News seeded!');
                                            resolve(user);
                                        })
                                        .catch(reject);

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
    seedUser(email, name, pwd, newRoles, avatar) {
        return new Promise((resolve, reject) => {
            Role.find({ name: { $in: newRoles } })
                .then(roles => {
                    let normalUser = {
                        email: email,
                        name: name,
                        password: pwd,
                        avatar,
                        roles: roles.map(r => r._id)
                    };

                    User
                        .create(normalUser)
                        .then((user) => {
                            console.log(`${user.name} seeded!`);
                            resolve(user);
                        }).catch(err => {
                            console.log(err);
                            reject(err);
                        });

                });
        });
    },
    seedPost(category, post) {
        return new Promise((resolve, reject) => {
            categoryService
                .getOne({ name: category })
                .then(category => {
                    post.category = category._id;
                    PostService
                        .create(post, category._id)
                        .then(resolve)
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                });
        });
    },
    seedComment(postId, comment) {
        return new Promise((resolve, reject) => {
            commentService
                .create(comment, postId)
                .then(resolve)
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
};