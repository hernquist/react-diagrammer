import React, { Component } from "react";
import {
  ShowUnassignedContainer as Container,
  ShowUnassignedNumber as Number,
  ShowUnassignedText as Text
} from "styles";

export default class ShowUnassigned extends Component {
  render() {
    const { unassigned } = this.props || [];
    const length = unassigned.length;
    const text = length === 1 ? `component` : `components`;

    return (
      <Container style={{ fontSize: "24px" }}>
        <Number>{unassigned.length}</Number>
        <Text>unassigned</Text>
        <Text>{text}</Text>
      </Container>
    );
  }
}
