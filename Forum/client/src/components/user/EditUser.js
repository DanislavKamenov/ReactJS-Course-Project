import React from 'react';
import BoundForm from '../forms/BoundForm';
import Button from '../buttons/Button';

const EditUser = ({id, email, name, avatar, onCancelClick, onEditSubmit}) => (
    <BoundForm formTitle={'Edit User: '} endPoint={`user/currentUser/${id}`} onSubmit={onEditSubmit}>
        <label className='control-label col-sm-4' htmlFor='email'>Email:</label>
        <input name='email' id='email' className='form-control' type='email' value={email} />
        <div className='error' data-name='email'></div>
        <label className='control-label col-sm-4' htmlFor='name'>Name:</label>
        <input name='name' id='name' className='form-control' type='text' value={name} />
        <div className='error' data-name='name'></div>
        <label className='control-label col-sm-4' htmlFor='avatar'>Avatar Url:</label>
        <input name='avatar' id='avatar' className='form-control' type='text' value={avatar} />
        <div className='error' data-name='avatar'></div>
        <Button className={'btn btn-sm btn-danger'} onClick={onCancelClick} text='Cancel' />
        <input id='submit' className='btn btn-sm btn-success' type='submit' value='Save' />
    </BoundForm>
)

export default EditUser;