import React from 'react';
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";
import Display from 'components/UI/Display';
import TypeOptions from "../StateAndProps/TypeOptions";
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
  handleSelect,
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
      <TypeOptions
        handleSelect={handleSelect}
        key="typeName"
        fieldtype={"typeName"}
        selected={typeName}
      />
    </Label>
    <Buttons style={{ width: "200px" }}>
      <Button onClick={() => validation('functionArgs')}
        text="SUBMIT"
        />
      <Button onClick={() => {
        handleClear('argName');
        handleClear('typeName');
      }}
        text="CLEAR"/>
    </Buttons>
  </Display>
);

export default Arguments;