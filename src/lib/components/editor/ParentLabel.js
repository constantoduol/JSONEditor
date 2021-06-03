import React from "react";
import { merge } from "lodash";
import AddIcon from "./AddIcon";
import RemoveIcon from "./RemoveIcon";

export default class ParentLabel extends React.Component {
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
      value,
      currentKey,
      getCollapseIcon,
      addElement,
      removeElement,
      current,
      parent,
      showRemoveButton,
      showAddButton,
      styles,
    } = this.props;
    let style = merge(
      { marginLeft: marginLeft, display: "flex" },
      styles.label
    );
    return (
      <div
        style={style}
        onMouseEnter={this.hoverStarted}
        onMouseLeave={this.hoverStopped}
      >
        <div>{value}</div>
        <div title="collapse node" style={{ marginLeft: 5 }}>
          {getCollapseIcon(marginLeft, currentKey)}
        </div>
        <div hidden={!this.state.hovering} style={{ marginLeft: 10 }}>
          <AddIcon
            hidden={!showAddButton}
            addElement={addElement}
            addTo={current}
            styles={styles}
          />
          <RemoveIcon
            hidden={!showRemoveButton}
            removeFrom={parent}
            removeKey={currentKey}
            removeElement={removeElement}
            styles={styles}
          />
        </div>
      </div>
    );
  }
}
