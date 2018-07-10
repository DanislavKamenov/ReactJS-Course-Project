const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',      
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        default: []
    }],
    createdOn: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    } 
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;