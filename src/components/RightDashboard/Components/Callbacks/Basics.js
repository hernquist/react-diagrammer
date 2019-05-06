import React from "react";
import Display from "components/UserInterface/Display";
import { Label, LabelText } from "styles";

const Basics = ({ visible, name, description, handleChange, container }) => (
  <Display visible={visible} container={container}>
    <Label>
      <LabelText>Callback name</LabelText>
      <input value={name} onChange={e => handleChange(e, "name")} />
    </Label>
    <Label>
      <LabelText>Optional Description</LabelText>
      <input
        value={description}
        onChange={e => handleChange(e, "description")}
      />
    </Label>
  </Display>
);

export default Basics;
