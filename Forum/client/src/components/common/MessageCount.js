import React, { Component } from 'react';
import webApi from '../../webModule/webApi';
import authService from '../../webModule/authService';
import './MessageCount.css';
import observer from '../../infrastructure/observer';

class MesssageCount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            intervalId: ''
        }
        observer.subscribe(observer.events.readMessage, this.updateCount);
    }

    getUnreadMessagesCount = () => {        
        webApi
            .get(`message/${authService.getProfile().id}`)
            .then(this.updateCount)
            .catch(webApi.handleFetchError);
    }

    updateCount = (res) => this.setState({count: res.privateMessages.filter(x => x.isRead === false).length})

    componentDidMount = () => {
        this.getUnreadMessagesCount();
        let intervalId = setInterval(this.getUnreadMessagesCount, 60000);
        this.setState({intervalId})
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalid);
    }

    render = () => this.state.count > 0 && <span className="unread">{this.state.count}</span>;
}

export default MesssageCount;