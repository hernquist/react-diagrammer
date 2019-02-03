const messageBuilder = (type, m, t, d = {}, time, cb) => {
  let priority = false;
  if (!t) { t = m };

  const messages = {
    emptyFields: `Please fill the empty ${d} fields`,
    emptyField: `${d} is empty`,
    invalidName: 'Component must consist only of letters, preferably Pascal or camel case',
    minimumLength: `At least 3 characters needed for ${d}`,
    parentNotSelected: `Please select a parent for this child component or choose UNASSIGNED for this component's placement`,
    invalidEmail: `Please provide a valid email`,

    minLengthGeneric: `At least ${d.number} characters needed for a ${d.name}`,
    nameTaken: 'Please select a different username',
    emailTaken: 'Please select a different email',
    [`Incorrect password`]: 'You entered the wrong password',
    [`No user with that email`]: 'There is no user with that email',
    [`update-state`]: `Presentional components don't have state to update`, 
    [`update-callbacks`]: `Presentional components don't have stateful callbacks to update`,
    [`unassign-component`]: 'Root components at the top of a tree cannot be unassigned' 
  };
  
  const titles = {
    emptyFields: 'Empty Field',
    emptyField: 'Empty Field',
    componentName: 'File Name',
    minimumLength: 'Field Too Short',
    parentNotSelected: 'No Parent Selected',
    signup: 'Signup Failed',
    nameTaken: 'Username Already in Use',
    emailTaken: 'Email Already in Use',
    [`Incorrect password`]: 'Incorrect Password',
    [`No user with that email`]: 'Incorrect Email',
    isPresentational: '',
    isRoot: ''
  };

  const timeMapping = {
    parentNotSelected: 5000
  }

  const title = titles[t];
  const message = messages[m];
  time = timeMapping[m] || 3000;
  if (!cb) { cb = null };

  return ({
    message,
    title,
    time,
    cb,
    priority
  })
}

export default messageBuilder;  
