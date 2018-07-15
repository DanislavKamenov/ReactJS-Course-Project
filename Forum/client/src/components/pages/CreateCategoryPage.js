import React, { Component } from 'react';
import BoundForm from '../forms/BoundForm';
import authService from '../../webModule/authService';
import withAuthorization from '../hocs/withAuthorization';

class CreateCategoryPage extends Component {
    onFormSubmit = () => {
        this.props.history.push('/categories');
    }
    render() {
        return (
            <div className='page login-page'>
                <BoundForm formTitle='Create Category' onSubmit={this.onFormSubmit} endPoint='category/'>
                    <input name='creator' id='creator' className='form-control' type='hidden' value={authService.getProfile().id} />
                    <label className='control-label col-sm-4' htmlFor='name'>Name:</label>
                    <input name='name' id='name' className='form-control' type='text' />
                    <div className='error' data-name='name'></div>
                    <label className='control-label col-sm-4' htmlFor='icon'>Icon:</label>
                    <input name='icon' id='icon' className='form-control' type='text' />
                    <div className='error' data-name='icon'></div>
                    <label className='control-label col-sm-4' htmlFor='description'>Description:</label>
                    <textarea name='description' id='description' className='form-control' type='text' />
                    <div className='error' data-name='description'></div>
                    <label className='control-label col-sm-4' htmlFor="user-radio">User</label>
                    <input name="editAccess" className="form-control" id="user-radio" value="User" type="radio" />
                    <label className='control-label col-sm-4' htmlFor="admin-radio">Admin</label>
                    <input name="editAccess" className="form-control" id="admin-radio" value="Admin" type="radio" />
                    <input id='submit' className='btn btn-sm btn-success' type='submit' value='Create' />
                </BoundForm>
            </div>
        )
    }
}

export default withAuthorization(CreateCategoryPage);