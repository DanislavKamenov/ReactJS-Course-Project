import React, { Component } from 'react';
import Comment from '../comment/Comment';
import StyledPagination from '../common/StyledPagination';

class ViewComments extends Component {
    render() {
        if (this.props.comments.length > 0) {
            const Comments = this.props.comments.map(c => {
                return (
                    <div key={c._id} className='commment'>
                        <Comment {...c} onDeleteClick={this.props.deleteComment} editComment={this.props.editComment} />
                    </div>
                );
            });

            return (
                <div className="comment-section">
                    {Comments}
                    <StyledPagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.limit}
                    totalItemsCount={this.props.collectionSize}
                    pageRangeDisplayed={5}
                    onChange={this.props.onPageChange}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
};

export default ViewComments;