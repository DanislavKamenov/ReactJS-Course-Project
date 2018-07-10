const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    creator: {
        type: String,
        ref: 'User',
        required: true,
    },
    content: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Post',
        required: true
    } 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;