import React from "react";
import merge from "lodash/merge";
import Label from "./Label";
import AddIcon from "./AddIcon";
import TypeSelector from "./TypeSelector";

export default class EmptyElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "text",
    };
  }

  onTypeChanged = (event) => {
    this.setState((state) => ({ ...state, type: event.target.value }));
  };

  render() {
    const { type } = this.state;
    const { marginLeft, marginBottom, label, addElement, current, styles } =
      this.props;
    const style = merge({ marginLeft, marginBottom }, styles.row);
    return (
      <div style={style}>
        <Label value={label} styles={styles} marginLeft={0} />
        <TypeSelector
          type={type}
          onChange={this.onTypeChanged}
          styles={styles}
        />
        <AddIcon
          type={type}
          addElement={addElement}
          addTo={current}
          styles={styles}
        />
      </div>
    );
  }
}
