import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MyMessages.css';

class MyMessages extends Component {
    render() {
        const messages = this.props.messages.map(m => {
            let className = 'message-creator';
            if (m.isRead === false) {                
                className += ' red';
            }

            return <div key={m._id} className="message">
                <Link className={className} onClick={this.props.onLinkClick} to={m._id} data-id={m._id}>Sender: {m.creator.name}</Link>
                <p>{m.content.slice(0, 5) + '...'}</p>
            </div>
        });

        return (
            <div className='my-messages'>
                {messages}
            </div>
        )
    }
}

export default MyMessages;