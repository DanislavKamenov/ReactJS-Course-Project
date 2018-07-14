import React, { Component } from 'react';
import ViewPosts from '../post/ViewPosts';
import withAuthorization from '../hocs/withAuthorization';
import authService from '../../webModule/authService';
import User from '../user/User'
import webApi from '../../webModule/webApi';

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userPosts: [],
            isInEdit: false,
            activePage: 1,
            collectionSize: 0,
            limit: 4
        }
    }

    componentDidMount() {
        const user = authService.getProfile();
        this.setState({ user });
        this.getUserPosts(this.state.pageNum, user.id);
    }

    onEditClick = () => {
        this.setState({ isInEdit: !this.state.isInEdit })
    };

    onEditSubmit = (res) => {
        authService.logIn(res);
        this.setState({ user: authService.getProfile(), isInEdit: false });
    }

    getUserPosts = (pageNum, userId) => {
        webApi
            .get(`post/user/${userId}/${pageNum}/${this.state.limit}`)
            .then(res => {
                this.setState({ userPosts: res.userPosts, collectionSize: res.count })
            })
            .catch(webApi.handleFetchError);
    }

    onPageChange = (pageNum) => {
        this.getUserPosts(pageNum, this.state.user.id);
        this.setState({ activePage: pageNum });
    }

    render() {
        return (
            <main className="page profile-page">
                <User {...this.state} onEditClick={this.onEditClick} onEditSubmit={this.onEditSubmit} />
                <ViewPosts
                    posts={this.state.userPosts}
                    activePage={this.state.activePage}
                    collectionSize={this.state.collectionSize}
                    limit={this.state.limit}
                    onPageChange={this.onPageChange}
                />
            </main>
        );
    }
}

export default withAuthorization(ProfilePage, 'user');