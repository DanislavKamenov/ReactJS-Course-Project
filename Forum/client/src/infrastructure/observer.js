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
    subscribe: (eventName, fn) => {        
        subscriptions[eventName].push(fn)},
    unsubscribe: (eventName, fn) => {        
        const position = subscriptions[eventName].findIndex(f => f === fn);
        subscriptions[eventName].splice(position, 1);
    },
    trigger: (eventName, data) => 
        subscriptions[eventName].forEach(fn => fn(data))
}