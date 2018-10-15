import React from "react";
import { ComponentContainer, ComponentName } from "styles";

const DisplayComponent = ({ component, parent, history }) => {
  const { name, iteration } = component;
  const stateOutput =
    component.style === "presentational" ? "n/a" : component.state.length;
  const border =
    component.style === "container" ? "3px solid red" : "3px solid blue";
  const backgroundColor =
    parent === component._id ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)";
  const margin = "0 3px";
  const styles = { border, backgroundColor, margin };

  return (
    <ComponentContainer
      style={styles}
      onClick={() => history.push(`/main/component/${name}/${iteration}`)}
    >
      <ComponentName>{component.name}</ComponentName>
      <div>{`STATE: ${stateOutput}`}</div>
      <div>{`PROPS: ${component.props.length}`}</div>
    </ComponentContainer>
  );
};

export default DisplayComponent;
