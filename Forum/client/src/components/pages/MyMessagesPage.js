import React, { Component } from 'react';
import MyMessages from '../user/MyMessages';
import withAuthorization from './../hocs/withAuthorization';
import SingleMessage from '../user/SingleMessage';
import webApi from '../../webModule/webApi';
import observer from '../../infrastructure/observer';
import authService from '../../webModule/authService';

class MyMessagesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            singleMessage: ''
        }
    }

    componentDidMount() {
        this.getMyMessages();
    }

    loadMessage = (singleMessage) => this.setState({ singleMessage })

    getMyMessages = () => {
        webApi
            .get(`message/${authService.getProfile().id}`)
            .then(res => this.setState({ messages: res.privateMessages }))
            .catch(webApi.handleFetchError);
    }

    markMessageAsRead = (res, position) => {
        this.setState(prevState => {
            return prevState.messages[position] = res.newPrivateMessage;
        });
        this.loadMessage(res.newPrivateMessage);
        observer.trigger(observer.events.readMessage, { privateMessages: this.state.messages });
    }

    onLinkClick = (e) => {
        const messageId = e.target.dataset.id;
        const position = this.state.messages.findIndex(m => m._id === messageId);
        webApi
            .post(`message/${messageId}/edit`, { isRead: true })
            .then(res => {
                this.markMessageAsRead(res, position);
            })
            .catch(webApi.handleFetchError);
    }

    onDeleteClick = (e) => {
        const messageId = e.target.dataset.id;

        webApi
            .delete(`message/${messageId}`)
            .then(res => {
                this.getMyMessages();
                this.setState({ singleMessage: '' });
            })
            .catch(webApi.handleFetchError);
    }

    render = () => (
        <main className='page my-messages-page'>
            <div className="my-messages-container">
                <MyMessages loadMessage={this.loadMessage} onLinkClick={this.onLinkClick} messages={this.state.messages} />
                {this.state.singleMessage && <SingleMessage {...this.state.singleMessage} onDeleteClick={this.onDeleteClick} />}
            </div>
        </main>
    );
}

export default withAuthorization(MyMessagesPage, 'user');