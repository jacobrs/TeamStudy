import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
    // Key name maps the rule
  required: {
    rule: value => {
            // return value.toString().trim();
      return (typeof value != 'undefined') && value.toString().trim();
    },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
    hint: value => {
      return <span className="form-error is-visible">Required</span>;
    },
  },
  email: {
    rule: value => {
      return validator.isEmail(value);
    },
    hint: value => {
      return <span className="form-error is-visible">{value} is not a valid Email.</span>;
    },
  },
  studentId: {
    rule: value => {
      const re = /[0-9]{8}/;
      return re.test(value);
    },
    hint: value => {
      return <span className="form-error is-visible">{value} is not a valid ID.</span>;
    },
  },
  validName: {
    rule: value => {
      const re = /[a-zA-Z]{2,}\s{1}[a-zA-Z]{2,}/;
      return re.test(value);
    },
    hint: value => {
      return <span className="form-error is-visible">{value} is not a valid Name.</span>;
    },
  },
  api: {
    hint: value => (
            <button
              className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        ),
  },
});
