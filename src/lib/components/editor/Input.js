import React from "react";
import { merge } from "lodash";
import RemoveIcon from "./RemoveIcon";
import SaveIcon from "./SaveIcon";
import { EDIT_KEY } from "../../util";
import Label from "./Label";
import TypeSelector from "./TypeSelector";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      editableInput: null,
      type: props.type,
      value: props.value,
    };
  }

  hoverStarted = () => {
    this.setState({ hovering: true });
  };

  hoverStopped = () => {
    this.setState({ hovering: false });
  };

  onEditableInputChange = (event) => {
    this.setState({ editableInput: event.target.value });
  };

  onTypeChanged = (event) => {
    this.setState((state) => ({ ...state, type: event.target.value }));
  };

  onValueChanged = (event) => {
    this.setState({ value: event.target.value }, () => {
      if (this.props.label !== EDIT_KEY || this.state.type === "text") {
        this.props.onChange(event);
      }
    });
  };

  onSaveElement = () => {
    let { saveElement, parent } = this.props;
    let { editableInput, type, value } = this.state;
    saveElement(parent, editableInput, type, value);
  };

  render() {
    let {
      marginLeft,
      marginBottom,
      label,
      removeElement,
      parent,
      currentKey,
      showRemoveButton,
      styles,
    } = this.props;
    let style = merge({ marginLeft, marginBottom }, styles.row);
    const { type, value } = this.state;
    return (
      <div
        style={style}
        onMouseEnter={this.hoverStarted}
        onMouseLeave={this.hoverStopped}
      >
        <Label
          value={label}
          styles={styles}
          onEditableInputChange={this.onEditableInputChange}
          marginLeft={0}
        />

        <TypeSelector
          hidden={label !== EDIT_KEY}
          styles={styles}
          type={type}
          onChange={this.onTypeChanged}
        />

        <div style={styles.value}>
          {type === "object" && <span style={styles.input}>{"{}"}</span>}
          {type === "array" && <span style={styles.input}>{"[]"}</span>}
          {type === "null" && <span style={styles.input}>{"null"}</span>}
          {type === "boolean" && (
            <select
              style={styles.select}
              value={value === "true"}
              onChange={this.onValueChanged}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}
          {(type === "text" || type === "number") && (
            <input
              style={styles.input}
              type={type}
              value={value}
              onChange={this.onValueChanged}
            />
          )}
        </div>
        <div hidden={label !== EDIT_KEY}>
          <SaveIcon
            saveIn={parent}
            saveKey={label}
            saveElement={this.onSaveElement}
            styles={styles}
          />
        </div>

        <RemoveIcon
          hidden={!this.state.hovering || !showRemoveButton}
          removeFrom={parent}
          removeKey={currentKey}
          removeElement={removeElement}
          styles={styles}
        />
      </div>
    );
  }
}
