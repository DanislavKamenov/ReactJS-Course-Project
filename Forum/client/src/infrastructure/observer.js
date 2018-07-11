let subscriptions = {
    loginUser: [],
    logoutUser: [],
    notification: [],
    readMessage: []
}

export default {
    events: {
        loginUser: 'loginUser',
        logoutUser: 'logoutUser',
        notification: 'notification',
        readMessage: 'readMessage'
    },
    subscribe: (eventName, fn) =>
        subscriptions[eventName].push(fn),
    trigger: (eventName, data) => 
        subscriptions[eventName].forEach(fn => fn(data))
}