import React from "react";
import { CurrentComponentTitle as Title } from "styles";

export default function ComponentHeader({ currentComponent }) {
  return (
    <Title>
      <div>{currentComponent.style.toUpperCase()}</div>
      <div>COMPONENT</div>
      <div>{`${currentComponent.name}.js`}</div>
    </Title>
  );
}
