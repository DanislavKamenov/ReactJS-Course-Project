import React, { Component } from 'react';
import PostDetails from './../post/PostDetails';
import Button from '../buttons/Button';
import webApi from '../../webModule/webApi';
import CreateComment from '../comment/CreateComment';
import ViewComments from '../comment/ViewComments';
import '../post/Details.css';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';
import withPermissions from './../hocs/withPermissions';
import withAuthorization from '../hocs/withAuthorization';
import { compose } from 'recompose';

class PostDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            hasPost: false,
            showForm: false,
            activePage: 1,
            limit: 3,
            collectionSize: 0,
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        webApi
            .get(`post/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ post: res.post, showForm: false, hasPost: true, collectionSize: res.post.comments.length })
            })
            .catch(webApi.handleFetchError)
    }

    editPost = () => {
        this.getPost();
    }

    deletePost = () => {
        webApi
            .delete(`post/${this.props.match.params.id}`)
            .then(res => {
                this.props.history.push('/categories');
                observer.trigger(observer.events.notification, (res))
            })
            .catch(webApi.handleFetchError)
    }

    addComment = (res) => {
        this.setState((prevState) => {
            prevState.post.comments.push(res.comment)
            prevState.collectionSize++;
            return prevState.showForm = false;
        });
    }

    editComment = () => {
        this.getPost();
    }

    deleteComment = (e) => {
        const commentId = e.target.dataset.id;
        const position = this.state.post.comments.findIndex(x => x._id === commentId);
        webApi
            .delete(`comment/${commentId}`)
            .then((res) => {
                this.setState(prevState => prevState.post.comments.splice(position, 1));
                observer.trigger(observer.events.notification, (res))
            })
            .catch(webApi.handleFetchError)
    }

    onButtonClick = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    onPageChange = (pageNum) => {
        this.setState({activePage: pageNum});
    }

    render() {
        const user = authService.getProfile();
        const { post, hasPost, showForm, ...otherState } = this.state;

        if (hasPost) {            
            const start = this.state.collectionSize - this.state.limit * this.state.activePage + 1;
            const end = start + this.state.limit;
            const pageComments = post.comments.slice(start, end);

            return (
                <main className="page post-details-page">
                    <PostDetails
                        canAccess={this.props.canAccess}
                        {...post}
                        editPost={this.editPost}
                        deletePost={this.deletePost}
                    />
                    <ViewComments
                        canAccess={this.props.canAccess}
                        comments={pageComments}
                        editComment={this.editComment}
                        deleteComment={this.deleteComment}
                        {...otherState}
                        onPageChange={this.onPageChange}
                    />
                    {showForm && <CreateComment
                        addComment={this.addComment}
                        path={this.props.match.params.id}
                    />}
                    {this.props.canAccess && <Button
                        className={'btn btn-sm btn-success post-reply'}
                        onClick={this.onButtonClick}
                        text='Reply'
                        disabled={user.isSilenced}
                    />}
                </main>
            );
        }
        return null;
    }
}

export default compose(
    withAuthorization,
    withPermissions
)(PostDetailsPage)