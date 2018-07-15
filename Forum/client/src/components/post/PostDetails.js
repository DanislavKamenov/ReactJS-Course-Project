import React, { Component } from 'react';
import helperService from '../../infrastructure/helperService';
import authService from '../../webModule/authService';
import Button from './../buttons/Button';
import BoundForm from '../forms/BoundForm';
import { Link } from 'react-router-dom';

class PostDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInEdit: false,
        }
    }

    onEditClick = () => this.setState({ isInEdit: !this.state.isInEdit });

    onEditSubmit = () => {
        this.props.editPost();
        this.setState({ isInEdit: false });
    }

    render() {
        const {_id, title, creator, content, createdOn, deletePost } = this.props;
        const user = authService.getProfile();

        return (
            <div className="details post-details">
                <h3 className="post-title">{title}</h3>
                <div className="creator">
                    <h5>{creator.name}</h5>
                    <img className="avatar" src={creator.avatar} alt="Avatar" />
                    {authService.loggedIn() && <Link className='send-message' to={`/message/${creator.name}/${creator._id}`}>Send a message</Link>}
                </div>
                <div className="details-body">
                    {this.state.isInEdit ?
                        <BoundForm onSubmit={this.onEditSubmit} endPoint={`post/${_id}`} >
                            <textarea name='content' id='content' className='form-control' value={content} type='text' />
                            <div className='error' data-name='content'></div>                            
                            <input id='submit' className='btn btn-sm btn-success' type='submit' value='Save' />
                            <Button className={'btn btn-sm btn-danger'} onClick={this.onEditClick} text='Cancel' />
                        </BoundForm> : <p className="content">{content}</p>}
                </div>
                <div className="details-footer">
                    <p className="created-on">{'Posted: ' + helperService.calcTime(createdOn) + ' ago.'}</p>
                    <div className="controls">
                        <ul>
                            {(creator.name === user.name || user.isAdmin) &&
                                <li className="action">
                                    <Button
                                        className={'btn btn-sm btn-success'}
                                        onClick={this.onEditClick}
                                        text='Edit Post'
                                        disabled={user.isSilenced} />
                                </li>}
                            {(creator.name === user.name || user.isAdmin) &&
                                <li className="action">
                                    <Button
                                        className={'btn btn-sm btn-danger'}
                                        onClick={deletePost}
                                        text='Delete'
                                        disabled={user.isSilenced} />
                                </li>}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetails;