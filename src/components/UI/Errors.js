import React from 'react';
import { ErrorsContainer } from 'styles';

const Errors = (errors, from="component") => {
  return (
    <ErrorsContainer>
      {errors.map(error => (
        <div key={error}>{from}: {error}</div>
      ))}
    </ErrorsContainer>
  )
}

export default Errors;