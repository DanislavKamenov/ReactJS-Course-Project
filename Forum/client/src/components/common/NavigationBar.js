import React, { Component } from 'react';
import UnauthNav from './UnauthNav';
import AuthNav from './AuthNav';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';
import webApi from '../../webModule/webApi';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: {},
            intervalId: ''
        }
        observer.subscribe(observer.events.loginUser, this.setNavigation);
        observer.subscribe(observer.events.logoutUser, this.setNavigation);
    }

    refreshUser = () => {
        if (authService.loggedIn()) {
            webApi
                .get(`user/${authService.getProfile().id}/token`)
                .then(res => {                    
                    authService.logIn(res);
                })
                .catch(webApi.handleFetchError);
        }
    }

    setNavigation = () => {
        this.setState({
            isLoggedIn: authService.loggedIn(),
            user: authService.getProfile()
        });
    }

    componentDidMount = () => {  
        this.setNavigation();      
        let intervalId = setInterval(this.refreshUser, 60000);
        this.setState({ intervalId })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalid);
    }

    render = () => this.state.isLoggedIn ? <AuthNav user={this.state.user} {...this.props} /> : <UnauthNav />;
}

export default NavigationBar