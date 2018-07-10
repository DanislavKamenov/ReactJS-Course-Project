const User = require('../models/User');
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
    removeOne: (query, options) => {
        new Promise((resolve, reject) =>
            userCrud
                .removeOne(query, options)
                .then(resolve)
                .catch(reject)
        );
    }
};