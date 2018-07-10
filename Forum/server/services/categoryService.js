const Category = require('../models/Category');
const crud = require('../infrastructure/crud');

const categoryCrug = crud(Category);

module.exports = {
    create: map => 
        new Promise((resolve, reject) => {
            categoryCrug
                .create(map)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) => 
        new Promise((resolve, reject) => {
            categoryCrug
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) => 
        new Promise((resolve, reject) => {
            categoryCrug
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) => 
        new Promise((resolve, reject) => {
            categoryCrug
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedCategory, options) => 
        new Promise((resolve, reject) => {
            categoryCrug
                .update(query, updatedCategory, options)
                .then(resolve)
                .catch(reject);
        })
};