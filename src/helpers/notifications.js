const messageBuilder = (type, m, t, d, time = 3000, cb) => {
  let priority = false
  if (!t) { t = m }
  const messages = {
    emptyFields: `Please fill the empty ${d} fields`
  }

  const titles = {
    emptyFields: 'Empty Field'
  }
    
  const title = titles[t];
  const message = messages[m];

  if (!cb) { cb = null};

  return ({
    message,
    title,
    time,
    cb,
    priority 
  })
}

export default messageBuilder;  