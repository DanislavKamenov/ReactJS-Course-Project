import React from 'react';
import './Button.css';

const Button = ({className, text, id, disabled, onClick}) => {
    return <button disabled={disabled} className={className} data-id={id} onClick={onClick}>{text}</button>; 
}

export default Button;