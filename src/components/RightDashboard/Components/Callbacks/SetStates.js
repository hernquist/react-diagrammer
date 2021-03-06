import React from "react";
import { RightDashboardButton as Button } from "components/UserInterface/RightDashboardButton";
import Display from "components/UserInterface/Display";
import StateOptions from "../StateAndProps/StateOptions";
import {
  Buttons,
  Label,
  LabelText,
  CallbackDetail,
  CallbackDetailText as Text,
  FunctionArgContainer
} from "styles";

const SetStates = ({
  container,
  currentComponent,
  handleChange,
  handleClear,
  handleSelect,
  setState,
  stateChange,
  stateField,
  validation,
  visible
}) => (
  <Display visible={visible} container={container}>
    {setState.length > 0 ? (
      <FunctionArgContainer>
        {setState.map((field, i) => (
          <CallbackDetail key={i}>
            <Text>
              {field.stateField}: {field.stateChange}
            </Text>
          </CallbackDetail>
        ))}
      </FunctionArgContainer>
    ) : null}
    <Label>
      <LabelText>State Field</LabelText>
      <StateOptions
        handleSelect={handleSelect}
        key="stateField"
        states={currentComponent.state}
        fieldtype={"stateField"}
        selected={stateField}
      />
    </Label>
    <Label>
      <LabelText>State Change</LabelText>
      <input
        value={stateChange}
        onChange={e => handleChange(e, "stateChange")}
      />
    </Label>
    <Buttons style={{ width: "200px" }}>
      <Button onClick={() => validation("setState")} text="SUBMIT" />
      <Button
        onClick={() => {
          handleClear("stateChange");
          handleClear("setState");
        }}
        text="CLEAR"
      />
    </Buttons>
  </Display>
);

export default SetStates;
