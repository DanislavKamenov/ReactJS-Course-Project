const router = require('express').Router();
const commentService = require('../services/commentService');

function createComment(req, res) {
    const postId = req.params.postId;
    const newComment = req.body;

    commentService
        .create(newComment, postId)
        .then(comment => {
            commentService
                .getOne({ _id: comment._id }, null, 'creator')
                .then(populatedComment => {
                    res.status(200).json({
                        success: true,
                        message: 'Comment created.',
                        comment: populatedComment
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        success: false,
                        message: err.message || err
                    });
                    console.log(err);
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

function editComment(req, res) {
    const commentId = req.params.commentId;
    const content = req.body.content;
    commentService
        .update({_id: commentId}, {content}, {new: true})
        .then(newComment => {
            res.status(200).json({
                success: true,
                message: 'Comment edited.',
                newComment
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

function deleteComment(req, res) {
    const commentId = req.params.commentId;

    commentService
        .removeOne({ _id: commentId })
        .then(oldComment => {            
            res.status(200).json({
                success: true,
                message: 'Comment deleted.',
                oldComment
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

router
    .post('/post/:postId', createComment)
    .post('/:commentId/edit', editComment)
    .delete('/:commentId', deleteComment);

module.exports = router;