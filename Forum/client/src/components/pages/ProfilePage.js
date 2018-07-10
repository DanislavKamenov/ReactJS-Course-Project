import React, { Component } from 'react';
import withAuthorization from '../hocs/withAuthorization';
import authService from '../../webModule/authService';
import User from '../user/User'

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            isInEdit: false
        }
    }

    componentDidMount() {
        this.setState({user: authService.getProfile()});
    }

    onEditClick = () => {
        this.setState({isInEdit: !this.state.isInEdit})
    };

    onEditSubmit = (res) => {        
        authService.logIn(res);
        this.setState({user: authService.getProfile(), isInEdit: false});
    }

    render() {
        console.log(this.props);
        return (
            <main className="page profile-page">                
                <User {...this.state} onEditClick={this.onEditClick} onEditSubmit={this.onEditSubmit}/>
            </main>
        );
    }
}

export default withAuthorization(ProfilePage, 'user');