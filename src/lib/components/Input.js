import React from "react";
import { merge } from "lodash";
import { RemoveIcon } from "./RemoveIcon";
import { SaveIcon } from "./SaveIcon";
import { EDIT_KEY } from "../helpers/editKey";
import { Label } from "./Label";

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      editableInput: null,
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

  onSaveElement = () => {
    let { saveElement, parent } = this.props;
    let { editableInput } = this.state;
    saveElement(parent, editableInput);
  };

  render() {
    let {
      marginLeft,
      marginBottom,
      label,
      value,
      type,
      onChange,
      removeElement,
      parent,
      currentKey,
      showRemoveButton,
      styles,
    } = this.props;
    let style = merge({ marginLeft, marginBottom }, styles.row);
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
        <div style={styles.value}>
          <input
            style={styles.input}
            type={type}
            value={value}
            onChange={onChange}
          />
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
