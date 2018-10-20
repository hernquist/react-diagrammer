import React, { Component } from "react";
import { RightDashboardTitle as Title, StateField } from "styles";

class DisplayFields extends Component {
  render() {
    const {
      currentComponent,
      editField,
      resetHighlight,
      setHighlight,
      type
    } = this.props;

    const fields =
      type === "state" ? currentComponent.state : currentComponent.props;
    const fieldtype = type === "state" ? "statetype" : "proptype";
    let header = `Existing ${type === `state` ? `state fields` : `props`}`;
    if (fields.length === 0) {
      header = "No state";
    }

    return (
      <div>
        <Title>{header}</Title>
        {fields.map(field => (
          <StateField
            style={{ fontSize: "16px", margin: "4px" }}
            key={field._id}
            onMouseEnter={() => editField(field)}
            onMouseLeave={resetHighlight}
            onClick={setHighlight}
          >
            {`${field.name}: ${field[fieldtype]}`}
          </StateField>
        ))}
      </div>
    );
  }
}

export default DisplayFields;
