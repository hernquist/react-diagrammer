import React from 'react';
import TypeOptions from "../StateAndProps/TypeOptions";
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";
import Display from 'components/UI/Display';
import { 
  Buttons, 
  Label, 
  LabelText,
  CallbackDetail,
  CallbackDetailText as Text,
  FunctionArgContainer 
} from 'styles';

const Arguments = ({ 
  argName,
  container,
  functionArgs,
  handleChange,
  handleClear,
  handleSelect,
  typeName,
  validation,
  visible
}) => (
  <Display visible={visible} container={container}>
    {functionArgs.length > 0 ?
      <FunctionArgContainer>
        {functionArgs.map((field, i) => 
          <CallbackDetail key={i}>
            <Text>{field.name}: {field.typeName}</Text>
          </CallbackDetail>
        )}
      </FunctionArgContainer> : null
    }
    <Label>
      <LabelText>Callback Argument</LabelText>
      <input value={argName} onChange={e => handleChange(e, 'argName') } />
    </Label>
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
