import React from 'react';
import { SubmitButton } from 'components/UI/SubmitButton';
import Display from 'components/UI/Display';
import { 
  Buttons, 
  Label, 
  LabelText, 
} from 'styles';

const Arguments = ({ 
  visible,
  functionArgs,
  deleteElement,
  argName,
  typeName,
  handleChange,
  handleClear,
  validation
}) => (
  <Display visible={visible}>
    {functionArgs.map((field, i) => 
      <div key={i}>{field.name} and {field.typeName}
        <span onClick={() => deleteElement(field, 'functionArgs')}> X </span>
      </div>
    )}
    <Label>
      <LabelText>Callback Argument</LabelText>
      <input value={argName} onChange={e => handleChange(e, 'argName') } />
    </Label>
    {/* selector for types */}
    <Label>
      <LabelText>Argument Type</LabelText>
      <input value={typeName} onChange={e => handleChange(e, 'typeName') } />
    </Label>
    <Buttons>
      <SubmitButton onClick={() => validation('functionArgs')}>
        SUBMIT
      </SubmitButton>
      <SubmitButton onClick={() => {
        handleClear('argName');
        handleClear('typeName');
      }}>
        CLEAR
      </SubmitButton>
    </Buttons>
  </Display>
);

export default Arguments;