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

const Arguments = ({ 
  argName,
  container,
  deleteElement,
  functionArgs,
  handleChange,
  handleClear,
  typeName,
  validation,
  visible
}) => (
  <Display visible={visible} container={container}>
    {functionArgs.map((field, i) => 
      <CallbackDetail key={i}>
        <Text>{field.name}: {field.typeName}</Text>
        <Delete onClick={() => deleteElement(field, 'functionArgs')}>
          X
        </Delete>
      </CallbackDetail>
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