import React, { Component, Fragment } from "react";
import {
  AccordionTitle as Title,
  AccordionText as Text,
  CallbackFormContainer as Container
} from "styles";
import Basics from "./Basics";
import Arguments from "./Arguments";
import SetStates from "./SetStates";
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";

export default class CallbackForm extends Component {
  state = { section: "basics" };

  showSection = section => () => this.setState({ section });

  validation = name => {
    const mapping = {
      functionArgs: ["callback arguments", "argName", "typeName"],
      setState: ["setState", "stateField", "stateChange"]
    };
    const [first, second] = [
      this.props[mapping[name][1]].length,
      this.props[mapping[name][2]].length
    ];
    const message = first === 0 || second === 0 ? "emptyFields" : null;

    message
      ? this.props.createNotification(
          "warning",
          message,
          message,
          mapping[name][0]
        )()
      : this.props.addElement(name);
  };

  render() {
    const { callback, create, currentComponent, mutation, handleSelect, name } = this.props;
    const { section } = this.state;

    const expand = isExpanded => (isExpanded ? "-" : "+");
    const basics = section === "basics";
    const args = section === "arguments";
    const setStates = section === "setStates";
    const disabled = !name;

    return (
      <Fragment>
        <Title onClick={this.showSection("basics")}>
          <Text>CALLBACK BASICS</Text>
          <Text>{expand(basics)}</Text>
        </Title>
        <Basics visible={basics} container={Container} {...this.props} />
        <Title onClick={this.showSection("arguments")}>
          <Text>CALLBACK ARGUMENTS</Text>
          <Text>{expand(args)}</Text>
        </Title>
        <Arguments
          visible={args}
          container={Container}
          validation={this.validation}
          handleSelect={handleSelect}
          create={true}
          {...this.props}
        />
        <Title onClick={this.showSection("setStates")}>
          <Text>CALLBACK SETSTATES</Text>
          <Text>{expand(setStates)}</Text>
        </Title>
        <SetStates
          visible={setStates}
          container={Container}
          validation={this.validation}
          handleSelect={handleSelect}
          {...this.props}
        />
        {create && (
          <Button
            disabled={disabled}
            onClick={() => callback(currentComponent, mutation)}
            text="SAVE CALLBACK"
          />
        )}
      </Fragment>
    );
  }
}
