import React, { Component } from 'react';
import helperService from '../../infrastructure/helperService';
import BoundForm from '../forms/BoundForm';
import Button from '../buttons/Button';
import authService from '../../webModule/authService';
import { Link } from 'react-router-dom';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInEdit: false
        }
    }

    onEditClick = (e) => {
        console.log('cancel click');
        this.setState({ isInEdit: !this.state.isInEdit });
    }

    onEditSubmit = () => {
        this.props.editComment();
        this.setState({ isInEdit: false });
    }

    render() {
        const { _id, creator, content, createdOn, onDeleteClick } = this.props;
        const user = authService.getProfile();
        
        return (
            <div className="details comment-details">
                <div className="creator">
                    <h5>{creator.name}</h5>
                    <img className="avatar" src={creator.avatar} alt="Avatar" />
                    <Link className='send-message' to={`/message/${creator.name}/${creator._id}`}>Send a message</Link>
                </div>
                <div className="details-body">
                    {this.state.isInEdit ?
                        <BoundForm onSubmit={this.onEditSubmit} endPoint={`comment/${creator._id}/edit`} >
                            <textarea name='content' id='content' className='form-control' value={content} type='text' />
                            <div className='error' data-name='content'></div>                            
                            <input id='submit' className='btn btn-sm btn-success' type='submit' value='Save' />
                            <Button className={'btn btn-sm btn-danger'} text='Cancel' onClick={this.onEditClick} />
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
                                        text='Edit Comment'
                                        disabled={user.isSilenced} />
                                </li>}
                            {(creator.name === user.name || user.isAdmin) &&
                                <li className="action">
                                    <Button
                                        id={_id}
                                        className={'btn btn-sm btn-danger'}
                                        onClick={onDeleteClick}
                                        text='Delete'
                                        disabled={user.isSilenced} />
                                </li>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default Comment;