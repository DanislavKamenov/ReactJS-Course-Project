const Comment = require('../models/Comment');
const crud = require('../infrastructure/crud');
const Post = require('../models/Post');

const commentCrud = crud(Comment);

module.exports = {
    create: (newComment, postId) =>
        new Promise((resolve, reject) => {
            Post.findOne({ _id: postId })
                .then(post => {
                    const comment = newComment;
                    comment.post = post._id;
                    commentCrud
                        .create(comment)
                        .then(createdComment => {
                            post.comments.push(createdComment);
                            post.save();
                            resolve(createdComment);
                        })
                        .catch(reject);
                })
                .catch(reject);

        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            commentCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeMany: (query) =>
        new Promise((resolve, reject) =>
            commentCrud
                .removeMany(query)
                .then(resolve)
                .catch(reject)
        ),
    removeOne: (query, options) => 
        new Promise((resolve, reject) =>
            Post
                .findOne({comments: query._id})                
                .then(post => {
                    post.comments.remove(query._id);
                                        
                    post.save();
                    commentCrud
                        .removeOne(query, options)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject)
        )
};