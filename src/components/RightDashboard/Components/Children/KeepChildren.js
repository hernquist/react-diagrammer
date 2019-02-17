import React, { Fragment } from "react";
import {
  Buttons,
  Label,
  LabelText,
  Selections,
  RightDashboardTitle as Title
} from "styles";
import { RightDashboardButton as Button } from "../../../UI/RightDashboardButton";

const KeepChildren = ({
  hasChildren,
  display,
  keepChildren,
  setKeepChildren
}) => {
  if (!display) return null;
  if (hasChildren)
    return (
      <Fragment>
        <Title>Keep the component</Title>
        <Title>children? {/* {keepChildren ? `YES` : `NO`} */}</Title>
        <Buttons>
          <Button
            className="dashboard-button"
            onClick={() => setKeepChildren(true)}
            text="YES"
          />
          <Button
            className="dashboard-button"
            onClick={() => setKeepChildren(false)}
            text="NO"
          />
        </Buttons>
      </Fragment>
    );
  // return <Title>No children</Title>;
  return null;
};

export default KeepChildren;
