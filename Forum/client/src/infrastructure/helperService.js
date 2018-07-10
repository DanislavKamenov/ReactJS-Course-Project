function calcTime(dateIsoFormat) {
    let diff = new Date() - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);   
}

function pluralize(value) {
    if (value !== 1) return 's';
    else return '';
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function validateForm(payload) {   
    let isFormValid = true;
    let message = '';
    let errors = {}  
    
    for (let field in payload) {
        let value = payload[field].trim();
        if (value.length === 0) {
            isFormValid = false;
            errors[field] = `${field} must not be empty!`;
            message = 'Check the form for errors.';
        }

        if (field === 'email' && !value.includes('@')) {
            isFormValid = false;
            errors[field] = 'Please provide a valid email address.';
            message = 'Check the form for errors.'
        }

        if (field === 'password' && value.length < 3) {
            isFormValid = false;
            errors[field] = 'Password must be at least 3 characters long.';
            message = 'Check the form for errors.'
        }

        if (field === 'avatar' && !(value.endsWith('jpg') || value.endsWith('jpeg') || value.endsWith('png'))) {
            isFormValid = false;
            errors[field] = 'Invalid avatar format. Accepted formats are: jpg, jpeg and png';
            message = 'Check the form for errors.'
        }

        if (field === 'title' && value.length < 5) {
            isFormValid = false;
            errors[field] = 'Title must be at least 5 characters long.';
            message = 'Check the form for errors.'
        }

        if (field === 'content' && value.length < 10) {
            isFormValid = false;
            errors[field] = 'Content must be at least 10 characters long.';
            message = 'Check the form for errors.'
        }

        if (field === 'repeatPassword' && value !== payload['password'].trim()) {
            isFormValid = false;
            errors[field] = 'Passwords do not match.';
            message = 'Check the form for errors.'
        }        
    }
    
    return {
        success: isFormValid,
        message,
        errors
    }
}

export default {
    calcTime,
    isEmpty,
    validateForm
}