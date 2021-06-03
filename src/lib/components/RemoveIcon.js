import React from "react";

export const RemoveIcon = (props) => {
  let { removeElement, removeFrom, removeKey, hidden, styles } = props;
  return (
    <span
      hidden={hidden}
      title="remove item"
      onClick={() => removeElement(removeFrom, removeKey)}
    >
      <span style={styles.removeButton}>&#215;</span>
    </span>
  );
};
