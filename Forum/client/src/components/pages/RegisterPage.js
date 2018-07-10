import React, {Component} from 'react';
import BoundForm from '../forms/BoundForm';
import authService from '../../webModule/authService';

class Loginpage extends Component {
    onFormSubmit = (res) => {
        authService.logIn(res);
        this.props.history.push('/categories');
    }

    render() {        
        return (
            <div className='page register-page'>
                <BoundForm formTitle='REGISTER' onSubmit={this.onFormSubmit} endPoint={'auth/signup'}>
                    <label className='control-label col-sm-4' htmlFor='email'>Email:</label>
                    <input name='email' id='email' className='form-control' type='email' />
                    <div className='error' data-name='email'></div>
                    <label className='control-label col-sm-4' htmlFor='name'>Name:</label>
                    <input name='name' id='name' className='form-control' type='text' />
                    <div className='error' data-name='name'></div>
                    <label className='control-label col-sm-4' htmlFor='avatar'>Avatar Url:</label>
                    <input name='avatar' id='avatar' className='form-control' type='text' />
                    <div className='error' data-name='avatar'></div>
                    <label className='control-label col-sm-4' htmlFor='password'>Password:</label>
                    <input name='password' id='password' className='form-control' type='password' />
                    <div className='error' data-name='password'></div>
                    <label className='control-label col-sm-4' htmlFor='repeatPassword'>Password:</label>
                    <input name='repeatPassword' id='repeatPassword' className='form-control' type='password' />
                    <div className='error' data-name='password'></div>
                    <input id='submit' className='btn btn-sm btn-success' type='submit' value='Register' />
                </BoundForm>
            </div>
        )
    }
}

export default Loginpage;