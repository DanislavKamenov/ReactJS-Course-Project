import React from 'react';
import authService from '../../webModule/authService';
import Unauthorized from '../common/Unauthorized';

const withAuthorization = (WrappedComponent, role) => (props) => {
    let isAuthorized;

    switch (role) {
        case 'user':
            isAuthorized = authService.loggedIn();
            break;
        case 'admin':
            isAuthorized = authService.getProfile().isAdmin;
            break;
        default:
            isAuthorized = false;
            break;
    }

    return isAuthorized ? <WrappedComponent {...props} /> : <Unauthorized />
}

export default withAuthorization;