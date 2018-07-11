import React, { Component, Children } from 'react';
import './Form.css';
import webApi from '../../webModule/webApi';
import withErrorMessage from './../hocs/withErrorMessage';
import observer from '../../infrastructure/observer';
import helperService from '../../infrastructure/helperService';

class BoundForm extends Component {
    constructor(props) {
        super(props);
        this.state = stateFromChildren(this.props.children);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const validationResult = helperService.validateForm(this.state);
        if (validationResult.success) {
            webApi.post(this.props.endPoint, this.state)
                .then((res) => { 
                    this.props.onSubmit(res);
                    observer.trigger(observer.events.notification, (res));
                })
                .catch(err => {
                    this.props.getErrors(err);
                    observer.trigger(observer.events.notification, (err));
                    console.log(err);
                });
        } else {
            this.props.getErrors(validationResult);
            observer.trigger(observer.events.notification, (validationResult))
            console.log(validationResult);
        }
    }

    render() {
        return (
            <div className={'form-panel panel-dark col-md-4 border'}>
                <div className="panel-heading">
                    <h1 className='panel-title'>{this.props.formTitle}</h1>
                </div>
                <div className='panel-body'>
                    <form className={'form'} onSubmit={this.handleSubmit}>
                        <fieldset>
                            {/* <div className='error'>{this.props.message}</div> */}
                            {Children.map(this.props.children, child => {
                                if (shouldHaveState(child)) {
                                    const { value, ...childProps } = child.props;
                                    return <child.type onChange={this.handleChange} value={this.state[child.props.name]} {...childProps} />
                                }
                                if (isErrorField(child)) {
                                    return <div {...child.props}>{this.props.errors[child.props['data-name']]}</div>
                                }                                
                                return child;
                            })}
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
};

function shouldHaveState(child) {
    return (child.type === 'input' || 'textarea') && child.props.name;
}

function isErrorField(child) {
    return child.type === 'div' && child.props.className === 'error';
}

function stateFromChildren(chidren) {
    const inputs = {};
    Children.forEach(chidren, child => {
        if (shouldHaveState(child)) {
            inputs[child.props.name] = child.props.value || '';
        }
    });

    return inputs;
}

export default withErrorMessage(BoundForm);