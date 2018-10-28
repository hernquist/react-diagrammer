import React from 'react';
import Display from 'components/UI/Display';
import { 
  Label, 
  LabelText, 
} from 'styles';

const Basics = ({ visible, name, description, handleChange }) => ( 
  <Display visible={visible}>
    <Label>
      <LabelText>Callback name</LabelText>
      <input 
        value={name} 
        onChange={e => handleChange(e, 'name') } 
      />
    </Label>
    <Label>
      <LabelText>Optional Description</LabelText>
      <input 
        value={description} 
        onChange={e => handleChange(e, 'description') } 
        />
    </Label>
  </Display>
)

export default Basics;