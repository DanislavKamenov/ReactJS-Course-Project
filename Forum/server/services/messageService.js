const Message = require('../models/Message');
const crud = require('../infrastructure/crud');

const messageCrud = crud(Message);

module.exports = {
    create: (newUser) =>
        new Promise((resolve, reject) => {
            messageCrud
                .create(newUser)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            messageCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            messageCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            messageCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            messageCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeOne: (query, options) => 
        new Promise((resolve, reject) =>
            messageCrud
                .removeOne(query, options)
                .then(resolve)
                .catch(reject)
        )
    
};