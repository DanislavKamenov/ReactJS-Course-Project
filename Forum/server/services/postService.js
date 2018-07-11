const Post = require('../models/Post');
const crud = require('../infrastructure/crud');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

const postCrud = crud(Post);

module.exports = {
    create: (newPost, catId) =>
        new Promise((resolve, reject) => {
            Category.findOne({ _id: catId })
                .then(cat => {
                    const post = newPost;
                    post.category = cat._id;
                    postCrud
                        .create(post)
                        .then(createdPost => {
                            cat.posts.push(createdPost);
                            cat.save();
                            resolve(createdPost);
                        })
                        .catch(reject);
                })
                .catch(reject);

        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            postCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            postCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            postCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            postCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeOne: (query, options) =>
        new Promise((resolve, reject) =>
            Comment
                .deleteMany({ post: query._id })
                .then((oldComments) => {
                    Category
                        .findOne({ posts: query._id })
                        .then(category => {
                            category.posts.remove(query._id);                           
                            category.save();

                            postCrud
                                .removeOne(query, options)
                                .then(resolve)
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject)
        )
};