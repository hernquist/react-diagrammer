const re = /\S+@\S+\.\S+/;

export const validateEmail = email => re.test(email);