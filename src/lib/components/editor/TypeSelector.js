import React from "react";
import PropTypes from "prop-types";

export default class TypeSelector extends React.Component {
  render() {
    const { hidden, styles, onChange,type } = this.props;

    return (
      <div hidden={hidden} style={styles.typeSelect}>
        <label htmlFor="type-selector" hidden>
          Select type:
        </label>
        <select
        value={type}
          name="type"
          id="type-selector"
          style={styles.select}
          onChange={onChange}
        >
          <option value="text">{'"abc"'}</option>
          <option value="object">{"{}"}</option>
          <option value="array">[]</option>
          <option value="boolean">T/F</option>
          <option value="number">0-9</option>
          <option value="null">null</option>
        </select>
      </div>
    );
  }
}

TypeSelector.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "object",
    "array",
    "boolean",
    "number",
    "null",
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  styles: PropTypes.shape({
    typeSelect: PropTypes.object,
    select: PropTypes.object,
  }).isRequired,
};
