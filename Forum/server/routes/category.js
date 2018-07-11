const router = require('express').Router();
const categoryService = require('../services/categoryService');

function getCategories(req, res) {
    categoryService.getAll(null, [{ path: 'posts', model: 'Post' }, { path: 'posts.creator', model: 'User' }])
        .then(categories => {
            res.status(200).json({
                success: true,
                categories
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
        });
}

function getSingleCategory(req, res) {
    const catId = req.params.id;
    const populate = [{
        path: 'posts',
        model: 'Post',
    }, {
        path: 'posts',
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

    categoryService
        .getOne({ _id: catId }, null, populate)
        .then(category => {
            res.status(200).json({
                success: true,
                category
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

function createCategory(req, res) {
    const category = req.body;

    categoryService
        .create(category)
        .then(category => {
            res.status(200).json({
                success: true,
                category,
                message: 'Category created'
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
    .get('/all', getCategories)
    .get('/:id', getSingleCategory)
    .post('/', createCategory)

module.exports = router;