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
      const re = /[0-9]{8}/;

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

  api: {

    hint: value => (
    <button className="form-error is-visible">
      API Error on "{value}" value. Focus to hide.
    </button>
    ),
  },

});
