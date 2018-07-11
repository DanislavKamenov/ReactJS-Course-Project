import React from 'react';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';
import { Redirect } from 'react-router-dom';

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

    if (isAuthorized) {
        return <WrappedComponent {...props} />;
    } else {
        const data = {success: false, message: 'You are not authorized to view this page.'}
        observer.trigger(observer.events.notification, data);
        return <Redirect to='/' />;
    }
}

export default withAuthorization;