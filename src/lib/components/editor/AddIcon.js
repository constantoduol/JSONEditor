import React from "react";

const AddIcon = (props) => {
  let { addElement, addTo, hidden, styles } = props;
  return (
    <span hidden={hidden} title="add item" onClick={() => addElement(addTo)}>
      <span style={styles.addButton}>&#43;</span>
    </span>
  );
};

export default AddIcon;
