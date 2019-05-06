import React from "react";
import StateOptions from "../StateAndProps/StateOptions";
import { RightDashboardButton as Button } from "components/UserInterface/RightDashboardButton";
import Display from "components/UserInterface/Display";
import {
  Buttons,
  Label,
  LabelText,
  CallbackDetail,
  CallbackDetailText as Text,
  Delete
} from "styles";

const EditSetStates = ({
  container,
  currentComponent,
  deleteElement,
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
    {setState.map((field, i) => (
      <CallbackDetail key={i}>
        <Text>
          {field.stateField}: {field.stateChange}
        </Text>
        <Delete onClick={() => deleteElement(field, "setState")}>X</Delete>
      </CallbackDetail>
    ))}
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
          handleClear("stateField");
        }}
        text="CLEAR"
      />
    </Buttons>
  </Display>
);

export default EditSetStates;
