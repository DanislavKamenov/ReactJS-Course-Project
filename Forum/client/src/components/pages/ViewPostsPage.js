import React, { Component } from 'react';
import ViewPosts from '../post/ViewPosts';
import webApi from '../../webModule/webApi';
import CreatePost from './../post/CreatePost';
import Button from '../buttons/Button';
import withAuthentication from '../hocs/withAuthorization';
import authService from '../../webModule/authService';


class ViewPostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: {},
            showForm: false
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        webApi.get(`post/all/${this.props.match.params.id}`)
            .then(res => this.setState({ posts: res.posts }))
            .catch(webApi.handleFetchError)
    }

    addPost = (res) => {
        this.setState((prevState) => {
            prevState.posts.push(res.post)
            return prevState.showForm = false;
        });
    }

    onButtonClick = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    render() {
        const user = authService.getProfile();
        return (
            <main className='page view-posts-page'>
                <Button className={'btn btn-sm btn-success'} onClick={this.onButtonClick} text='Create A Post' disabled={user.isSilenced} />
                {this.state.showForm && <CreatePost addPost={this.addPost} path={this.props.match.params.id} />}
                <ViewPosts posts={this.state.posts} />
            </main>
        );
    }
};

export default withAuthentication(ViewPostsPage, 'user');