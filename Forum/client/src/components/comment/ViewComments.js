import React, { Component } from 'react';
import Comment from '../comment/Comment';

class ViewComments extends Component {  
    onEditSubmit = () => {
        this.props.editComment();
        this.setState({isInEdit: false});
    }

    render() {
        if (this.props.comments.length > 0) {
            const Comments = this.props.comments.map(c => {
                return (
                    <div key={c._id} className='commment'>
                        <Comment {...c} onDeleteClick={this.props.deleteComment} editComment={this.props.editComment} />                        
                    </div>
                )
            });

            return Comments;
        } else {
            return null;
        }
    }
};

export default ViewComments;