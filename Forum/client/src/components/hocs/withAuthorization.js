import React from 'react';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';
import { Redirect } from 'react-router-dom';

const withAuthorization = (WrappedComponent, role) => (props) => {    
    const user = authService.getProfile();

    if (user.isBanned) {
        authService.logout();
        const data = { success: false, message: 'Your account has been banned! Contact our support for more info!' }
        observer.trigger(observer.events.notification, data);
        return <Redirect to='/' />;
    }

    let isAuthorized;

    switch (role) {
        case 'user':
            isAuthorized = authService.loggedIn();
            break;
        case 'admin':
            isAuthorized = user.isAdmin;
            break;
        default:
            isAuthorized = true;
            break;
    }

    if (isAuthorized) {
        return <WrappedComponent {...props} />;
    } else {
        const data = { success: false, message: 'You are not authorized to view this page.' }
        observer.trigger(observer.events.notification, data);
        return <Redirect to='/' />;
    }
}

export default withAuthorization;