const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    editAccess: {
        type: String,
        default: 'User'
    },
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        default: []
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;