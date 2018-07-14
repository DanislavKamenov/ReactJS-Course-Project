const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const postService = require('../services/postService');
const crud = require('../infrastructure/crud');

const userCrud = crud(User);

module.exports = {
    create: (newUser) =>
        new Promise((resolve, reject) => {
            userCrud
                .create(newUser)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            userCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeOne: (query) => {
        return new Promise((resolve, reject) => {
            Comment
                .deleteMany({ creator: query._id })
                .then(commentDeleteData =>
                    postService
                        .get({ creator: query._id })
                        .then(posts => {
                            let promises = [];
                            for (const post of posts) {
                                promises.push(postService
                                    .removeOne({ _id: post._id }));
                            }

                            Promise
                                .all(promises)
                                .then(deletedPosts => {
                                    userCrud.removeOne(query)
                                        .then(resolve)
                                        .catch(reject);
                                })
                                .catch(reject);
                        })
                        .catch(reject)
                )
                .catch(reject);
        }
        );
    }
};