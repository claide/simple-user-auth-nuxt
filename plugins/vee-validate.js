import { extend } from "vee-validate";
import { required, email, password } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required."
});

extend('email', {
  ...email,
  message: 'Email must be valid',
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
