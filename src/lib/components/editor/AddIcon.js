import React from "react";
import PropTypes from "prop-types";

const AddIcon = (props) => {
  let { addElement, addTo, hidden, styles, type } = props;
  return (
    <span hidden={hidden} title="add item" onClick={() => addElement(addTo, type)}>
      <span style={styles.addButton}>&#43;</span>
    </span>
  );
};

AddIcon.displayName = "AddIcon";

AddIcon.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "object",
    "array",
    "boolean",
    "number",
    "null",
  ]),
  addElement: PropTypes.func.isRequired,
  addTo: PropTypes.any.isRequired,
  hidden: PropTypes.bool,
  styles: PropTypes.shape({
    addButton: PropTypes.object,
  }).isRequired,
};

export default AddIcon;
