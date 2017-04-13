import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {

   // Key name maps the rulerequired: {
  required: {
    rule: value => {
           // return value.toString().trim();

      return (typeof value !== 'undefined') && value.toString().trim();
    },

       // Function to return hint

       // You may use current value to inject it in some way to the hint

    hint: value => {
      return <span className="form-error is-visible">This field is required</span>;
    },

  },

  email: {

    rule: value => {
      return validator.isEmail(value);
    },

    hint: value => {
      return <span className="form-error is-visible">{value} is not a valid email.</span>;
    },

  },

  studentId: {

    rule: value => {
      const re = /^[0-9]{8}$/;

      return re.test(value);
    },

    hint: value => {
      return <span className="form-error is-visible">The ID should be composed of 8 digits.</span>;
    },

  },

  validName: {

    rule: value => {
      const re = /[a-zA-Z]{2,}\s{1}[a-zA-Z]{2,}/;

      return re.test(value);
    },

    hint: value => {
      return <span className="form-error is-visible">A valid full name must contain one space.</span>;
    },

  },
  passwordMatch: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
    rule: (value, components) => {
      const password = components.password.state;
      const passwordConfirm = components.passwordConfirm.state;
      const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed
                && (typeof value !== 'undefined');
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: () => <span className="form-error is-visible">Passwords should be equal.</span>,
  },

  password: {
    rule: value => {
      // one uppercase,one lowercase,one digit,8 characters
      const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      return re.test(value);
    },

    hint: value => {
      return <span className="form-error is-visible">Password should contain at least 8 characters, 1 digit, 1 uppercase and 1 lowercase character.</span>;
    },
  },

  api: {

    hint: value => (
    <button className="form-error is-visible">
      API Error on "{value}" value. Focus to hide.
    </button>
    ),
  },

});

export default Validation.rules;
