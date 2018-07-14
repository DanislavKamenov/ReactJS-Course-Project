import React, { Component } from 'react';
import authService from '../../webModule/authService';
import webApi from '../../webModule/webApi';
import helperService from '../../infrastructure/helperService';

const withPermissions = (WrappedComponent) => class withPermissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {}
        }
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory = () => {
        webApi
            .get(`category/${this.props.match.params.id}`)
            .then(res => this.setState({ category: res.category }))
            .catch(webApi.handleFetchError);
    }

    checkPermissions() {
        const user = authService.getProfile();
        let canAccess = true; 

        if (helperService.isEmpty(user)) {
            return false;
        }

        if (!user.roleNames.includes(this.state.category.editAccess)) {
            canAccess = false;
        }

        return canAccess;
    }

    render() {
        const canAccess = this.checkPermissions();
        return <WrappedComponent canAccess={canAccess} {...this.props} />
    }
}

export default withPermissions;