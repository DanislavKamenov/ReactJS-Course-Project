import React from 'react';
import UserData from './UserData';
import EditUser from './EditUser';

const User = ({user, isInEdit, onEditClick, onEditSubmit }) => 
    isInEdit ? <EditUser {...user} onCancelClick={onEditClick} onEditSubmit={onEditSubmit}/> : <UserData {...user} onEditClick={onEditClick} />

export default User;