import React, { Component } from 'react';
import BoundForm from '../forms/BoundForm';
import authService from '../../webModule/authService';

class CreatePost extends Component {
    render() {  
        return (
            <div className="create-post">
                <BoundForm formTitle='Create A Post: ' onSubmit={this.props.addPost} endPoint={`post/category/${this.props.path}`}>
                    <input name='creator' value={authService.getProfile().id} type="hidden"/>
                    <label className='control-label col-sm-4' htmlFor='title'>Title:</label>
                    <input name='title' id='title' className='form-control' type='text' />
                    <div className='error' data-name='title'></div>
                    <label className='control-label col-sm-4' htmlFor='content'>Speak your mind:</label>
                    <textarea name='content' id='content' className='form-control' />
                    <div className='error' data-name='content'></div>
                    <input id='submit' className='btn btn-sm btn-success' type='submit' value='Create' />
                </BoundForm>
            </div>
        )
    }
}

export default CreatePost;