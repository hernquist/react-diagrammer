import React from "react";
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";
import Display from "components/UI/Display";
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
      <input value={stateField} onChange={e => handleChange(e, "stateField")} />
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

export default EditSetStates;

