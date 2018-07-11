const router = require('express').Router();
const postService = require('../services/postService');


function getPost(req, res) {
    const postId = req.params.id;
    const populate = [{
        path: 'creator',
        model: 'User',
        select: {
            _id: '1',
            name: '1',
            avatar: '1',
            roleNames: '1',
            isAdmin: '1',
            isSilenced: '1',
            isBanned: '1'
        }

    }, {
        path: 'comments',
        model: 'Comment',

    }, {
        path: 'comments',
        populate: {
            path: 'creator',
            model: 'User',
            select: {
                _id: '1',
                name: '1',
                avatar: '1',
                roleNames: '1',
                isAdmin: '1',
                isSilenced: '1',
                isBanned: '1'
            }
        }
    }];

    postService
        .getOne({ _id: postId }, null, populate)
        .then(post => {
            res.status(200).json({
                success: true,                
                post
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

function getPostsInCategory(req, res) {
    const categoryId = req.params.categoryId;
    const populate = [{
        path: 'creator',
        model: 'User',
        select: {
            _id: '1',
            name: '1',
            avatar: '1',
            roleNames: '1',
            isAdmin: '1',
            isSilenced: '1',
            isBanned: '1'
        }

    }];

    postService.
        get({category: categoryId}, {sort: '-createdOn'}, populate)
        .then(posts => {
            res.status(200).json({
                success: true,                
                posts
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

function editPost(req, res) {
    const postId = req.params.id;
    const content = req.body.content;

    postService
        .update({_id: postId}, {content}, {new: true})
        .then((newPost) => {
            res.status(200).json({
                success: true,  
                message: 'Post Edited.',
                newPost              
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

function deletePost(req, res) {
    const postId = req.params.id;

    postService
        .removeOne({_id: postId})
        .then((deletedPost) => {
            res.status(200).json({
                success: true,
                message: 'Post deleted.',
                deletedPost              
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

function createPost(req, res) {
    const catId = req.params.categoryId;
    const newPost = req.body;

    postService
        .create(newPost, catId)
        .then(post => {
            postService
                .getOne({ _id: post._id }, null, 'creator')
                .then(populatedPost => {
                    res.status(200).json({
                        success: true,
                        message: 'Post created.',
                        post: populatedPost
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        success: false,
                        message: err.message || err
                    });
                });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
        });
}

router
    .get('/:id', getPost)
    .get('/all/:categoryId', getPostsInCategory)
    .post('/:id', editPost)
    .delete('/:id', deletePost)
    .post('/category/:categoryId/', createPost);

module.exports = router;