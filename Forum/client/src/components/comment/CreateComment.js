import React from 'react';
import BoundForm from '../forms/BoundForm';
import authService from '../../webModule/authService';

const CreateComment = (props) => (
    <div className="create-post">
        <BoundForm formTitle='Create A Comment: ' onSubmit={props.addComment} endPoint={`comment/post/${props.path}`}>
            <input name='creator' value={authService.getProfile().id} type="hidden" />
            <label className='control-label col-sm-4' htmlFor='content'>Speak your mind:</label>
            <textarea name='content' id='content' className='form-control' />
            <div className='error' data-name='content'></div>
            <input id='submit' className='btn btn-sm btn-success' type='submit' value='Reply' />
        </BoundForm>
    </div>
);

export default CreateComment;