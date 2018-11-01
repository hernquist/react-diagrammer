import React from 'react';
import { Errors as ErrorsContainer} from 'styles';

export default Errors = (errors, from="component") => {
  return (
    <ErrorsContainer>
      {errors.map(error => (
        <div key={error}>{from}: {error}</div>
      ))}
    </ErrorsContainer>
  )
}
