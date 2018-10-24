import React, { Component } from "react";
import { RightDashboardTitle as Title, StateField } from "styles";

class DisplayFields extends Component {
  render() {
    const {
      currentComponent,
      showEdit,
      hideEdit,

      editField,
      onHover,
      setHighlight,
      type
    } = this.props;

    const fields =
      type === "state" ? currentComponent.state : currentComponent.props;
    const fieldtype = type === "state" ? "statetype" : "proptype";
    let header = `Existing ${type === "state" ? `state fields` : `props`}`;
    if (fields.length === 0) {
      header = type === "state" ? "No state" : "No props";
    }

    return (
      <div>
        <Title>{header}</Title>
        {fields.map(field => (
          <StateField
            style={{ fontSize: "16px", margin: "4px" }}
            key={field._id}
            onMouseEnter={() => {
              onHover && showEdit(field._id);
            }}
            onMouseLeave={hideEdit}
            onClick={() => setHighlight(field)}
          >
            {editField === field._id
              ? `EDIT`
              : `${field.name}: ${field[fieldtype]}`}
          </StateField>
        ))}
      </div>
    );
  }
}

export default DisplayFields;
