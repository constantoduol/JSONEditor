import React from "react";
import { merge } from "lodash";
import { Label } from "./Label";
import { RemoveIcon } from "./RemoveIcon";

export class Boolean extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  hoverStarted = () => {
    this.setState({ hovering: true });
  };

  hoverStopped = () => {
    this.setState({ hovering: false });
  };

  render() {
    let {
      marginLeft,
      marginBottom,
      label,
      value,
      onChange,
      parent,
      currentKey,
      removeElement,
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
        <Label value={label} styles={styles} marginLeft={0} />
        <div style={styles.value}>
          <select style={styles.select} value={value} onChange={onChange}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
