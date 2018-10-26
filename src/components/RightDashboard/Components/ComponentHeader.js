import React from "react";
import { CurrentComponentTitle as Title, ButtonContainer } from "styles";

export default function ComponentHeader({ currentComponent, children }) {
  return (
    <Title>
      <ButtonContainer>{children}</ButtonContainer>
      <div>{currentComponent.style.toUpperCase()}</div>
      <div>COMPONENT</div>
      <div>{`${currentComponent.name}.js`}</div>
    </Title>
  );
}
