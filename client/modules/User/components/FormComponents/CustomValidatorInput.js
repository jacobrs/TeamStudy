import React, { Component } from 'react';
import { inputFactory } from 'react-validation/lib/build/validation.rc';
import Validation from 'react-validation';

// Not using ES6 classes? Then you'd write instead:
// const MyBootstrapInput = React.createClass(...)
//
// If you are using ES7 decorators, you can use:
@inputFactory
class CustomValidatorInput extends Component {
    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <i className="material-icons">{this.props.icon}</i>
                </span>
                <div className="">
                    <div className={`form-group ${this.props.hint && "has-error"}`}>
                        <input
                            className={`form-control ${this.props.className}`}
                            id={this.props.id}
                            type={this.props.type}
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlur}
                            value={this.props.value}
                            checked={this.props.checked}
                        />
                        { this.props.hint && <div className="help-block error-input">{this.props.hint}</div> }
                    </div>
                </div>
            </div>
        );
    }
}

// Wrap the component in the factory (if not using ES7 decorators)
export default CustomValidatorInput;