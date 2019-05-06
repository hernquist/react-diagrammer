import React from 'react';
import { ErrorsContainer } from 'styles';

const Errors = ({errors = [], from = 'UnnamedComponent', exception}) => {
  const expections = {
    "auth": "Error! GraphQL error: user not authenticated"
  }

  return (
    <ErrorsContainer>
      {errors
        .filter(error => 
          error !== expections[exception])
        .map(error => (
          <div key={error}>{from}: {error}</div>
        ))
      }
    </ErrorsContainer>
  )
}

export default Errors;