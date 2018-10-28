import React from 'react';
import { SubmitButton } from 'components/UI/SubmitButton';
import Display from 'components/UI/Display';
import { 
  Buttons, 
  Label, 
  LabelText, 
} from 'styles';

const SetStates = ({
  visible,
  setState,
  deleteElement,
  stateChange,
  stateField,
  handleChange,
  handleClear,
  validation
}) => (
  <Display visible={visible}>
    {setState.map((field, i) => 
      <div key={i}>{field.stateField} and {field.stateChange}
        <span onClick={() => deleteElement(field, 'setState')}> X </span>
      </div>
    )}
    {/* todo make a selector */}
    <Label>
      <LabelText>State Field</LabelText> 
      <input 
        value={stateField} 
        onChange={e => handleChange(e, 'stateField') } 
      />
    </Label>
    <Label>
      <LabelText>State Change</LabelText>
      <input 
        value={stateChange} 
        onChange={e => handleChange(e, 'stateChange') } 
      />
    </Label>
    <Buttons>
      <SubmitButton onClick={() => validation('setState')}>
        SUBMIT
      </SubmitButton>
      <SubmitButton onClick={() => {
        handleClear('stateChange');
        handleClear('setState');
      }}>
        CLEAR
      </SubmitButton>
    </Buttons>
  </Display>
)

export default SetStates;