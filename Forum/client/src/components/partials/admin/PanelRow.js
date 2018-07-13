import React from 'react';
import Button from './../../buttons/Button';

const PanelRow = ({ idx, id, name, email, isSilenced, isBanned, onBanClick, onSilenceClick, onDestroyClick }) => (
    <tr>
        <th scope="row">{idx + 1}</th>
        <td>{name}</td>
        <td>{email}</td>
        <td>
            <div className="controls">
                <ul>
                    <li className="action"><Button className={'btn btn-sm btn-danger'} id={id} onClick={onSilenceClick} text={isSilenced ? 'Unsilence User' : 'Silence User'} /></li>
                    <li className="action"><Button className={'btn btn-sm btn-danger'} id={id} onClick={onBanClick} text={isBanned ? 'Unban User' : 'Ban User'} /></li>
                    <li className="action"><Button className={'btn btn-sm btn-danger'} id={id} onClick={onDestroyClick} text='Destroy User' /></li>
                </ul>
            </div>
        </td>
    </tr>
);

export default PanelRow;