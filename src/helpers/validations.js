const validEmail = /\S+@\S+\.\S+/;

export const validateEmail = email => validEmail.test(email);
