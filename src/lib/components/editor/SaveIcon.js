import React from "react";

const SaveIcon = (props) => {
  let { saveElement, saveIn, saveKey, styles } = props;
  return (
    <span title="save item" onClick={() => saveElement(saveIn, saveKey)}>
      <span style={styles.saveButton}>&#10003;</span>
    </span>
  );
};

export default SaveIcon;
