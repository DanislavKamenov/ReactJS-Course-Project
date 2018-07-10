import React, { Component } from 'react';
import observer from '../../infrastructure/observer';
import './Notification.css';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            message: '',
            timeout: ''
        }
        observer.subscribe(observer.events.notification, this.showNotification);
    }

    showNotification = (data) => {
        const type = data.success ? 'info' : 'error';
        const message = data.message;       

        this.setState({
            type,
            message,
            timeout: setTimeout(this.clearNotification, 3000)
        });
    }

    clearNotification = () => {
        this.setState({ type: '', message: '' });
        console.log('cleared');
    }

    render = () =>
        this.state.type && (
            <div id="notifications">
                <div id={`${this.state.type}Box`} onClick={this.clearNotification} className="notification">
                    <span>{this.state.message}</span>
                </div>
            </div>
        );
}

export default Notification;