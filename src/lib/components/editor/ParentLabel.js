import React from "react";
import PropTypes from "prop-types";
import { merge } from "lodash";
import AddIcon from "./AddIcon";
import RemoveIcon from "./RemoveIcon";
import TypeSelector from "./TypeSelector";

export default class ParentLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      type: "text",
    };
  }
  onTypeChanged = (event) => {
    this.setState((state) => ({ ...state, type: event.target.value }));
  };

  hoverStarted = () => {
    this.setState({ hovering: true });
  };

  hoverStopped = () => {
    this.setState({ hovering: false });
  };

  render() {
    const {
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
      parentType,
    } = this.props;
    const style = merge(
      { marginLeft: marginLeft, display: "flex", alignItems: "baseline" },
      styles.label
    );
    const { type, hovering } = this.state;
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
        {parentType === "array" && (
          <TypeSelector
            type={type}
            onChange={this.onTypeChanged}
            styles={styles}
          />
        )}
        <div hidden={!hovering} style={{ marginLeft: 10 }}>
          <AddIcon
            type={type}
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

ParentLabel.propTypes = {
  parentType: PropTypes.oneOf(["array", "object"]).isRequired,
  value: PropTypes.any.isRequired,
  addElement: PropTypes.func.isRequired,
  removeElement: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    addButton: PropTypes.object,
  }).isRequired,
  getCollapseIcon: PropTypes.func.isRequired,
  current: PropTypes.any.isRequired,
  parent: PropTypes.any.isRequired,

  showRemoveButton: PropTypes.bool,
  showAddButton: PropTypes.bool,
  marginLeft: PropTypes.number,
};
