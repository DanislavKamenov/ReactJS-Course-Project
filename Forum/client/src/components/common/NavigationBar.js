import React, { Component } from 'react';
import UnauthNav from './UnauthNav';
import AuthNav from './AuthNav';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: {}
        }
        observer.subscribe(observer.events.loginUser, this.checkLoggedIn);
        observer.subscribe(observer.events.logoutUser, this.checkLoggedIn);
    }

    checkLoggedIn = () => this.setState({
        isLoggedIn: authService.loggedIn(),
        user: authService.getProfile()
    });

    componentDidMount = () => this.checkLoggedIn();

    render = () => this.state.isLoggedIn ? <AuthNav user={this.state.user} {...this.props}/> : <UnauthNav />;
}

export default NavigationBar