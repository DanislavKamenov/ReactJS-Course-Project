import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import helperService from '../../infrastructure/helperService';

export default (props) => {
    const { _id, title, creator, createdOn, content } = props;

    return (
        <article className="post">
            <div className="post-content">
                <div className="title">
                    <Link to={`/posts/${_id}`}>{title}</Link>
                </div>
                <div className="details">
                    <div className="intro">{content.slice(0, 100) + '...'}</div>
                    <div className="info">
                        submitted {helperService.calcTime(createdOn)} ago by: {creator.name}
                    </div>
                </div>
            </div>
        </article>
    );
};