import React from 'react';
import './List.css';
import Post from './Post';
import StyledPagination from '../common/StyledPagination';

const ViewPosts = (props) => {
    if (props.posts.length > 0) {
        const Posts = props.posts.map(p => {
            return <Post key={p._id} {...p} />
        });

        return (
            <div className="post-container">
                {Posts}
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
}

export default ViewPosts;