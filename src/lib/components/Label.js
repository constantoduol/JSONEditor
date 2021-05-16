import React from "react";
import { EDIT_KEY } from "../helpers/editKey";
import { merge } from "lodash";

export const Label = (props) => {
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
