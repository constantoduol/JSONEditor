import React from "react";

export const AddIcon = (props) => {
  let { addElement, addTo, hidden, styles } = props;
  return (
    <span hidden={hidden} title="add item" onClick={() => addElement(addTo)}>
      <span style={styles.addButton}>&#43;</span>
    </span>
  );
};
