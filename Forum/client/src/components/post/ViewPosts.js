import React, { Component } from 'react';
import './List.css';
import Post from './Post';
import StyledPagination from '../common/StyledPagination';

class ViewPosts extends Component {
    render() {
        if (this.props.posts.length > 0) {
            const Posts = this.props.posts.map(p => {
                return <Post key={p._id} {...p} />
            });

            return (
                <div className="post-container">                    
                    {Posts}
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

export default ViewPosts;