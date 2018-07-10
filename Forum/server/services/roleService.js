const Role = require('../models/Role');
const crud = require('../infrastructure/crud');

const roleCrud = crud(Role);

module.exports = {
    create: (newUser) => 
        new Promise((resolve, reject) => {
            roleCrud
                .create(newUser)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) => 
        new Promise((resolve, reject) => {
            roleCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) => 
        new Promise((resolve, reject) => {
            roleCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) => 
        new Promise((resolve, reject) => {
            roleCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) => 
        new Promise((resolve, reject) => {
            roleCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        })
};