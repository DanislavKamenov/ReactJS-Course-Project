import React from 'react';
import Comment from '../comment/Comment';
import StyledPagination from '../common/StyledPagination';

const ViewComments = (props) => {    
        if (props.comments.length > 0) {
            const Comments = props.comments.map(c => {
                return (
                    <div key={c._id} className='commment'>
                        <Comment {...c} onDeleteClick={props.deleteComment} editComment={props.editComment} />
                    </div>
                );
            });

            return (
                <div className="comment-section">
                    {Comments}
                    <StyledPagination
                    activePage={props.activePage}
                    itemsCountPerPage={props.limit}
                    totalItemsCount={props.collectionSize}
                    pageRangeDisplayed={5}
                    onChange={props.onPageChange}
                    />
                </div>
            );
        } else {
            return null;
        }
    };

export default ViewComments;