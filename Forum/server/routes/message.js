const router = require('express').Router();
const messageService = require('../services/messageService');

function getMessages(req, res) {
    const recepient = req.params.recepientId;
    messageService
        .get({recepient}, null, 'creator')
        .then(privateMessages => {
            res.status(200).json({
                success: true,
                privateMessages                
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
        });
}

function createMessage(req, res) {    
    const recepient = req.params.recepientId;
    const creator = req.body.creator;
    const title = req.body.title;
    const content = req.body.content;

    const newMessage = {
        creator,
        title,
        recepient,
        content
    };

    messageService
        .create(newMessage)
        .then(privateMessage => {
            res.status(200).json({
                success: true,
                privateMessage,
                message: 'Private message sent.'
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
        });
}

function editMessage(req ,res) {
    const messageId = req.params.messageId;
    const isRead = req.body.isRead;
    messageService
        .update({_id: messageId}, {isRead: isRead}, {new: true, populate: 'creator'})
        .then(newPrivateMessage => {
            res.status(200).json({
                success: true,
                newPrivateMessage
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                message: err.message || err
            });
        });

}

function deleteMessage(req, res) {
    const messageId = req.params.messageId;

    messageService
        .removeOne({_id: messageId})
        .then(oldMessage => {
            res.status(200).json({
                success: true,
                oldMessage
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
    .get('/:recepientId', getMessages)
    .post('/:recepientId', createMessage)    
    .post('/:messageId/edit', editMessage)
    .delete('/:messageId', deleteMessage);

module.exports = router;