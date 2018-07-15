import React, { Component } from 'react';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: 'Guest' };
        observer.subscribe(observer.events.logoutUser, this.checkUser);
    }


    componentDidMount = () => this.checkUser();

    componentWillUnmount = () => observer.unsubscribe(observer.events.logoutUser, this.checkUser);

    checkUser = () => this.setState({ user: authService.getProfile().name || 'Guest' });

    render = () => (
        <div className="page home-page">
            <h1>Welcome {this.state.user}</h1>
            {!authService.loggedIn() && <p>Welcome to our forum. Feel free to browse our content as a guest or register to use the full features of our website.</p>}
            <p>Please behave yourself and enjoy your stay!</p>
        </div>
    );
}

export default HomePage;