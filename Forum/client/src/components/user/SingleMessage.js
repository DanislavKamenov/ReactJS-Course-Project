import React from 'react'
import Button from '../buttons/Button';

const SingleMessage = ({_id, title, content, creator, onDeleteClick }) => (
    <div className="message-body">
        <h3>{title}</h3>
        <p className="content">{content}</p>
        <p className="creator">Sent by: {creator.name}</p>
        <Button className={'btn btn-sm btn-danger'} id={_id} onClick={onDeleteClick} text='Delete' />
    </div>
)

export default SingleMessage;