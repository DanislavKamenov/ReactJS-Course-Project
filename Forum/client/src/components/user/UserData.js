import React from 'react';
import Button from '../buttons/Button';
import './UserData.css';

const UserData = ({ name, email, avatar, roleNames, onEditClick }) => (
    <div className="container user-data-container">
        <div className="col-sm-6 user-data-row">
            <div className="image" >
                <img src={avatar} className="avatar" alt="avatar"/>
            </div>

            <div className="span8">
                <h3>{name}</h3>
                <h6>Email: {email}</h6>
                <h6>Roles: {roleNames && roleNames.join(', ')}</h6>
            </div>

            <div className="controls">
                <ul>
                    <li className="action"><Button className={'btn btn-sm btn-info'} onClick={onEditClick} text='Edit' /></li>
                </ul>
            </div>
        </div>
    </div>
);

export default UserData;