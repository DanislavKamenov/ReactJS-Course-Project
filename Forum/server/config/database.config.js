const mongoose = require('mongoose');
const seeder = require('../utils/seeder');

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;

    database.once('open', () => {
        console.log('Database connected!');

        database.db.listCollections({}).next((err, coll) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!coll) {
                //This seeds admin user and roles if there is no Database.
                //If you want to reseed the data please DROP the current Database.
                seeder.seedRolesAndAdmin()
                    .then(() => {
                        const promises = [
                            seeder.seedUser('pesho@abv.bg', 'pesho', '123', ['User'], 'https://i.pinimg.com/736x/29/a8/20/29a82067b71bd9e3df95e1c0ba5c4daf--fantasy-art-avatar-jake-sully.jpg'),
                            seeder.seedUser('stefka@abv.bg', 'Stefka', '123', ['User'], 'https://thumbs.dreamstime.com/b/cute-girl-avatar-icon-young-woman-glasses-pretty-lady-portrait-cartoon-illustration-beautiful-brunette-76317721.jpg'),
                        ];

                        Promise
                            .all(promises)
                            .then((users) => {
                                const generalPosts = [{
                                    creator: users[0]._id,
                                    title: 'Tell me a story',
                                    content: 'I want to learn more about the users of this forum. Tell me a little about yourselves.'
                                },
                                {
                                    creator: users[0]._id,
                                    title: 'Meme discussion',
                                    content: 'Do you like memes? Let\'s talk about them. Which memes are dankest in your opinion'
                                },
                                {
                                    creator: users[1]._id,
                                    title: 'Help please',
                                    content: 'I don\'t know how to change my profile avatar.'
                                },
                                ];

                                const promises = [
                                    seeder.seedPost('General Discussion', generalPosts[0]),
                                    seeder.seedPost('General Discussion', generalPosts[1]),
                                    seeder.seedPost('Support', generalPosts[2])
                                ];

                                Promise
                                    .all(promises)
                                    .then(posts => {
                                        console.log('Posts seeded!');

                                        const comments = [{
                                            creator: users[0]._id,
                                            post: posts[0]._id,
                                            content: 'Hi I\'m Pesho. I\'ve been browsing this forum for years..'
                                        },
                                        {
                                            creator: users[1]._id,
                                            post: posts[0]._id,
                                            content: 'Hi I\'m Stefka. I just joined this forum.'
                                        }
                                        ];

                                        const promises = [
                                            seeder.seedComment(posts[0]._id, comments[0]),
                                            seeder.seedComment(posts[0]._id, comments[1])
                                        ];

                                        Promise
                                            .all(promises)
                                            .then(comments => {
                                                console.log('Comments seeded!');
                                            });
                                    });
                            });
                    });
            }
        });
    }).on('error', err => {
        console.log('Connection Error:');
        console.log(err);
    });
};