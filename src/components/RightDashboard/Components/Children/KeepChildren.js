import React, { Fragment } from "react";
import {
  Buttons,
  RightDashboardTitle as Title
} from "styles";
import { RightDashboardButton as Button } from "../../../Ui/RightDashboardButton";

const KeepChildren = ({
  hasChildren,
  display,
  setKeepChildren
}) => {
  if (!display) return null;
  if (hasChildren)
    return (
      <Fragment>
        <Title>Keep the component</Title>
        <Title>children?</Title>
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
  
    return null;
};

export default KeepChildren;
