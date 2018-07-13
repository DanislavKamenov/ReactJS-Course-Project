import React, { Component } from 'react';
import ViewPosts from '../post/ViewPosts';
import webApi from '../../webModule/webApi';
import CreatePost from './../post/CreatePost';
import Button from '../buttons/Button';
import authService from '../../webModule/authService';
import withPermissions from './../hocs/withPermissions';
import { compose } from 'recompose';
import withAuthorization from '../hocs/withAuthorization';


class ViewPostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            activePage: 1,
            limit: 4,
            collectionSize: 0,
            showForm: false
        };
    }

    componentDidMount() {
        this.getPosts(this.state.activePage);
    }

    getPosts = (pageNum) => {
        webApi.get(`post/all/${this.props.match.params.id}/${pageNum}/${this.state.limit}`)
            .then(res => this.setState({ posts: res.posts, collectionSize: res.size }))
            .catch(webApi.handleFetchError)
    }

    addPost = (res) => {
        this.setState((prevState) => {
            prevState.posts.unshift(res.post); 
            prevState.collectionSize++;      
            if (prevState.posts.length > prevState.limit) {
                prevState.posts.pop();
            }
            return prevState.showForm = false;
        });
    }

    onButtonClick = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    onPageChange = (pageNum) => {
        this.getPosts(pageNum);
        this.setState({activePage: pageNum});
    }

    render() {
        const user = authService.getProfile();
        return (
            <main className='page view-posts-page'>
                {this.props.canAccess && <Button className={'btn btn-sm btn-success'} onClick={this.onButtonClick} text='Create A Post' disabled={user.isSilenced} />}
                {this.state.showForm && <CreatePost addPost={this.addPost} path={this.props.match.params.id} />}
                <ViewPosts posts={this.state.posts} activePage={this.state.activePage} collectionSize={this.state.collectionSize} limit={this.state.limit} onPageChange={this.onPageChange} />
            </main>
        );
    }
};

export default compose(
    withAuthorization,
    withPermissions
)(ViewPostsPage);