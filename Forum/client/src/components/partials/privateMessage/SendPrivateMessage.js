import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BoundForm from '../../forms/BoundForm';
import authService from '../../../webModule/authService';
import observer from '../../../infrastructure/observer';
import withAuthorization from '../../hocs/withAuthorization';

class SendPrivateMessage extends Component {
    onMessageSubmit = () => {        
        this.props.history.goBack();
    }

    render() {
        const user = authService.getProfile();
        const name = this.props.match.params.name;
        const id = this.props.match.params.id;

        if (user.name === name) {
            this.props.history.goBack();
            const data = { success: false, message: 'You should not try to talk to yourself.' }
            observer.trigger(observer.events.notification, data);
            return null;
        } else {
            return (
                <div className='page send-private-message'>
                    <h3>Send a message to: {name}</h3>
                    <BoundForm onSubmit={this.onMessageSubmit} endPoint={`message/${id}`}>
                        <input name='creator' value={user.id} type="hidden" />
                        <label className='control-label col-sm-4' htmlFor='title'>Title:</label>
                        <input name='title' id='title' className='form-control' type='text' />
                        <div className='error' data-name='title'></div>
                        <label className='control-label col-sm-4' htmlFor='content'>Message:</label>
                        <textarea name='content' id='content' className='form-control' type='text' />
                        <div className='error' data-name='content'></div>
                        <input id='submit' className='btn btn-sm btn-success' type='submit' value='Send' />
                    </BoundForm>
            </div> );
        }       
    }
}

export default withAuthorization(withRouter(SendPrivateMessage), 'user');