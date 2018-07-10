import React, { Component } from 'react';
import PostDetails from './../post/PostDetails';
import Button from '../buttons/Button';
import webApi from '../../webModule/webApi';
import CreateComment from '../comment/CreateComment';
import ViewComments from '../comment/ViewComments';
import '../post/Details.css';
import authService from '../../webModule/authService';
import observer from '../../infrastructure/observer';

class PostDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            hasPost: false,
            showForm: false
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        webApi
            .get(`post/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ post: res.post, showForm: false, hasPost: true })
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

    render() {
        const user = authService.getProfile();
        return (
            this.state.hasPost && <main className="page post-details-page">
                <PostDetails {...this.state.post} editPost={this.editPost} deletePost={this.deletePost} />               
                <ViewComments comments={this.state.post.comments} editComment={this.editComment} deleteComment={this.deleteComment} />
                {this.state.showForm && <CreateComment addComment={this.addComment} path={this.props.match.params.id} />}
                <Button className={'btn btn-sm btn-success post-reply'} onClick={this.onButtonClick} text='Reply' disabled={user.isSilenced}/>
            </main>
        )
    }
}

export default PostDetailsPage;