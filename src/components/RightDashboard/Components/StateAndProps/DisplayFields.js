import React from "react";
import { Field } from "styles";

const DisplayFields = ({
  currentComponent,
  showEdit,
  hideEdit,
  editField,
  onHover,
  setHighlight,
  type
}) => {
  const fields =
    type === "state" ? currentComponent.state : currentComponent.props;
  const fieldtype = type === "state" ? "statetype" : "proptype";

  return (
    <div>
      {fields.map(field => (
        <Field
          key={field._id}
          onMouseEnter={() => {
            onHover && showEdit(field._id);
          }}
          onMouseLeave={hideEdit}
          onClick={() => setHighlight(field)}
        >
          <div>{`${field.name}: ${field[fieldtype]}`}</div>
          <div>{editField === field._id && `EDIT`}</div>
        </Field>
      ))}
    </div>
  );
};

export default DisplayFields;
