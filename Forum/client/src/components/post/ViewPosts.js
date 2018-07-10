import React, { Component } from 'react';
import './List.css';
import Post from './Post';

class ViewPosts extends Component {
    render() {
        if (this.props.posts.length > 0) {
            const Posts = this.props.posts.map(p => {                
                return <Post key={p._id} {...p}/>    
            })
            return Posts;
        } else {
            return null;
        }
    }
};

export default ViewPosts;