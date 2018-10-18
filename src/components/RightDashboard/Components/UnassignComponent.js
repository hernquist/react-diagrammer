import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Modal from "../../UI/Modal";
export default class UnassignComponent extends Component {
  render() {
    const name = "help";
    return (
      <Mutation>
        <div>
          Are you sure you want to remove {name.toUpperCase()} from the react
          tree?
        </div>
      </Mutation>
    );
  }
}
