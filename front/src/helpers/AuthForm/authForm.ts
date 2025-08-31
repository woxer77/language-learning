import { RegisterOptions } from "react-hook-form";

const emailOptions = {
  required: 'Required',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Invalid email format',
  }
};

const passwordOptions = {
  required: 'Required',
  minLength: {
    value: 8,
    message: 'Minimum 8 characters',
  },
  validate: {
    digit: (value: string) => value && /[0-9]/.test(value) || 'Must contain a digit',
    lowercase: (value: string) => value && /[a-z]/.test(value) || 'Must contain a lowercase letter',
    uppercase: (value: string) => value && /[A-Z]/.test(value) || 'Must contain an uppercase letter'
  }
};

const confirmPasswordOptions = (originalPassword: string): RegisterOptions => {
  return {
    required: "Required",
    validate: (value: string) => value === originalPassword || "Passwords must match"
  };
};

export { emailOptions, passwordOptions, confirmPasswordOptions };
