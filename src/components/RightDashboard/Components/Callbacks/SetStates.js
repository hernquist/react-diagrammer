import React from 'react';
import { SubmitButton } from 'components/UI/SubmitButton';
import Display from 'components/UI/Display';
import { 
  Buttons, 
  Label, 
  LabelText,
  CallbackDetail,
  CallbackDetailText as Text,
  Delete 
} from 'styles';

const SetStates = ({
  container,
  deleteElement,
  handleChange,
  handleClear,
  setState,
  stateChange,
  stateField,
  validation,
  visible
}) => (
  <Display visible={visible} container={container}>
    {setState.map((field, i) =>
      <CallbackDetail key={i}>
        <Text>{field.stateField}: {field.stateChange}</Text>
        <Delete onClick={() => deleteElement(field, 'setState')}>
          X
        </Delete>
      </CallbackDetail> 
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