import React from "react";
import { EDIT_KEY } from "../../util";
import { merge } from "lodash";

const Label = (props) => {
  let { marginLeft, value, onEditableInputChange, styles } = props;
  if (value === EDIT_KEY) {
    return (
      <div>
        <input
          style={styles.input}
          type="text"
          onChange={onEditableInputChange}
        />
      </div>
    );
  }

  let style = merge({ marginLeft }, styles.label);
  return <div style={style}>{value}</div>;
};

export default Label;
