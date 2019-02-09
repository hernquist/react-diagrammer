import React, { Component, Fragment } from "react";
import EditBasics from "./EditBasics";
import EditArguments from "./EditArguments";
import EditSetStates from "./EditSetStates";
import {
  AccordionTitle as Title,
  AccordionText as Text,
  CallbackFormContainer as Container
} from "styles";

class EditCallbackForm extends Component {
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
    const { 
      currentComponent, 
      argName,
      deleteElement,
      description,
      functionArgs,
      handleSelect, 
      handleChange,
      handleClear, 
      name,
      setState,
      stateChange,
      stateField,
      typeName
    } = this.props;
    const { section } = this.state;

    const expand = isExpanded => (isExpanded ? "-" : "+");
    const basics = section === "basics";
    const args = section === "arguments";
    const setStates = section === "setStates";

    return (
      <Fragment>
        <Title onClick={this.showSection("basics")}>
          <Text>CALLBACK BASICS</Text>
          <Text>{expand(basics)}</Text>
        </Title>
        <EditBasics 
          container={Container} 
          description={description}
          handleChange={handleChange} 
          name={name}
          visible={basics} 
        />
        <Title onClick={this.showSection("arguments")}>
          <Text>CALLBACK ARGUMENTS</Text>
          <Text>{expand(args)}</Text>
        </Title>
        <EditArguments
          argName={argName}
          container={Container}
          deleteElement={deleteElement}
          functionArgs={functionArgs}
          handleChange={handleChange}
          handleClear={handleClear}
          handleSelect={handleSelect}
          typeName={typeName}
          validation={this.validation}
          visible={args}
          />
        <Title onClick={this.showSection("setStates")}>
          <Text>CALLBACK SETSTATES</Text>
          <Text>{expand(setStates)}</Text>
        </Title>
        <EditSetStates
          container={Container}
          currentComponent={currentComponent}
          deleteElement={deleteElement}
          handleChange={handleChange}
          handleClear={handleClear}
          handleSelect={handleSelect}
          setState={setState}
          stateChange={stateChange}
          stateField={stateField}
          validation={this.validation}
          visible={setStates}
        />
      </Fragment>
    );
  }
}

export default EditCallbackForm;
