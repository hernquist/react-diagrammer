const messageBuilder = (type, m, t, d, time, cb) => {
  let priority = false;
  if (!t) { t = m };
  
  const messages = {
    emptyFields: `Please fill the empty ${d} fields`,
    emptyField: `${d} is empty`,
    minimumLength: `At least 3 characters needed for ${d}`,
    parentNotSelected: `Please select a parent for this child component or choose UNASSIGNED for this component's placement`
  }; 
  
  const titles = {
    emptyFields: 'Empty Field',
    emptyField: 'Empty Field',
    minimumLength: 'Field Too Short',
    parentNotSelected: `No Parent Selected`
  };
    
  const title = titles[t];
  const message = messages[m];

  const timeMapping = {
    parentNotSelected: 5000
  }

  time = timeMapping[m] || 3000;
  console.log(time) 

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