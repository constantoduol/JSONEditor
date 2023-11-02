import React from "react";
import {
  isArray,
  isObject,
  isNumber,
  isString,
  isBoolean,
  cloneDeep,
} from "lodash";
import JSONViewer from "./JSONViewer";
import {
  CollapseIcon,
  isNodeCollapsed,
  toggleNodeCollapsed,
} from "./components/shared/CollapseIcon";

import Boolean from "./components/editor/Boolean";
import ParentLabel from "./components/editor/ParentLabel";
import Input from "./components/editor/Input";
import { EDIT_KEY } from "./util";
import { jsonEditorDefaultStyles } from "./util";
import { getKey } from "./util";

export default class JSONEditor extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep: 10, //indentation step for nested objects
    marginBottom: 3, //margin bottom of nodes
    collapsible: true, //whether nodes are collapsible or not
    //this prevents modifying the data you passed in however cloning is expensive especially for large objects
    cloneData: true,
    onChange: null, //data changed handler,
    view: "single", //dual, shows the editor and the json viewer side to side,
    collapsedNodes: {},
    synchronizedCollapse: true, //if in dual view when editor is collapsed, viewer is also collapsed
    showAddButton: true, //show + icon to add elements in object/array
    showRemoveButton: true, //show x icon to remove elements from object/array,
    styles: jsonEditorDefaultStyles, //pass to override styles
  };

  constructor(props) {
    super(props);
    this.state = {
      data: { root: props.cloneData ? cloneDeep(props.data) : props.data },
      collapsedNodes: this.props.collapsedNodes,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.state)) {
      this.setState({
        data: {
          root: nextProps.cloneData
            ? cloneDeep(nextProps.data)
            : nextProps.data,
        },
        marginLeftStep: nextProps.marginLeftStep,
        marginBottom: nextProps.marginBottom,
        collapsible: nextProps.collapsible,
        cloneData: nextProps.cloneData,
        onChange: nextProps.onChange,
        view: nextProps.view,
        collapsedNodes: nextProps.collapsedNodes,
        synchronizedCollapse: nextProps.synchronizedCollapse,
        showAddButton: nextProps.showAddButton,
        showRemoveButton: nextProps.showRemoveButton,
        styles: nextProps.styles,
      });
    }
  }

  getCollapseIcon(marginLeft, currentKey) {
    let { collapsedNodes } = this.state;
    let { collapsible, marginLeftStep, styles } = this.props;
    return (
      <CollapseIcon
        collapsedNodes={collapsedNodes}
        marginLeft={marginLeft}
        collapsible={collapsible}
        currentKey={currentKey}
        styles={styles}
        isNodeCollapsed={isNodeCollapsed.bind(
          this,
          marginLeft,
          currentKey,
          marginLeftStep
        )}
        toggleNodeCollapsed={toggleNodeCollapsed.bind(
          this,
          marginLeft,
          currentKey,
          marginLeftStep
        )}
      />
    );
  }

  dataChanged(key, parent, type, e) {
    let value = this.castToType(e.target.value, type);
    parent[key] = value;
    this.setState(this.state.data);
    if (this.props.onChange)
      this.props.onChange(key, value, parent, this.state.data.root);
  }

  castToType(value, type) {
    switch (type) {
      case "number":
        return Number(value);
      case "string":
        return String(value);
      case "boolean":
        return value === "true" ? true : false;
      default:
        return value;
    }
  }

  recursiveParseData(currentKey, parentKeyPath, parent, elems, marginLeft) {
    parentKeyPath = parentKeyPath + "_" + currentKey;
    let data = parent[currentKey];
    let label = currentKey;
    let { marginLeftStep, styles } = this.props;

    if (isArray(parent)) {
      label += 1;
      label += ".";
    }

    if (isArray(data)) {
      if (marginLeft > 0) {
        //special case to avoid showing root
        // parent node
        elems.push(
          <ParentLabel
            key={getKey("parent_label", currentKey, parentKeyPath, marginLeft)}
            value={label}
            addElement={this.addElement}
            removeElement={this.removeElement}
           // showRemoveButton={this.props.showRemoveButton}
            showAddButton={this.props.showAddButton}
            current={data}
            parent={parent}
            marginLeft={marginLeft}
            currentKey={currentKey}
            styles={styles}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if (isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep))
        return; //this node is collapsed

      for (let key = 0; key < data.length; key++) {
        this.recursiveParseData(
          key,
          parentKeyPath,
          data,
          elems,
          marginLeft + marginLeftStep
        );
      }
    } else if (isObject(data)) {
      if (marginLeft > 0) {
        //special case to avoid showing root
        // root node
        elems.push(
          <ParentLabel
            key={getKey("parent_label", currentKey, parentKeyPath, marginLeft)}
            value={label}
            addElement={this.addElement}
            removeElement={this.removeElement}
            showRemoveButton={this.props.showRemoveButton}
          //  showAddButton={this.props.showAddButton}
            current={data}
            parent={parent}
            marginLeft={marginLeft}
            currentKey={currentKey}
            styles={styles}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if (isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep))
        return; //this node is collapsed

      Object.keys(data).forEach((key) => {
        this.recursiveParseData(
          key,
          parentKeyPath,
          data,
          elems,
          marginLeft + marginLeftStep
        );
      });
    } else if (isNumber(data)) {
      elems.push(
        <Input
          key={getKey("input", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
          saveElement={this.saveElement}
         // showRemoveButton={this.props.showRemoveButton}
          showAddButton={this.props.showAddButton}
          label={label}
          type="number"
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, "number")}
          styles={styles}
          value={data}
        />
      );
    } else if (isString(data)) {
      elems.push(
        <Input
          key={getKey("input", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
          saveElement={this.saveElement}
         // showRemoveButton={this.props.showRemoveButton}
          showAddButton={this.props.showAddButton}
          label={label}
          type="text"
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, "text")}
          styles={styles}
          value={data}
        />
      );
    } else if (isBoolean(data)) {
      elems.push(
        <Boolean
          key={getKey("boolean", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
        // showRemoveButton={this.props.showRemoveButton}
          showAddButton={this.props.showAddButton}
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, "boolean")}
          label={label}
          value={data}
          styles={styles}
        />
      );
    }
  }

  addElement = (parent) => {
    let newKey = null;
    if (isArray(parent)) {
      if (typeof parent[0] == 'object') {
				var obj2 = JSON.parse(JSON.stringify(parent[parent.length - 1]));
				parent.splice(parent.length - 1, 0, obj2);
				newKey = parent.length - 1;
			} else {
				parent.push('');
				newKey = parent.length - 1;
			}
    } else {
      newKey = EDIT_KEY;
      parent[newKey] = "";
    }
    this.setState({ data: this.state.data });
    if (this.props.onChange)
      this.props.onChange(newKey, null, parent, this.state.data);
  };

  removeElement = (parent, removeKey) => {
    let currentValue = parent[removeKey];
    if (isArray(parent)) {
      parent.splice(removeKey, 1);
    } else {
      delete parent[removeKey];
    }
    this.setState(this.state.data);
    if (this.props.onChange)
      this.props.onChange(removeKey, currentValue, parent, this.state.data);
  };

  saveElement = (parent, saveKey) => {
    let value = parent[EDIT_KEY];
    parent[saveKey] = value;
    delete parent[EDIT_KEY];
    this.setState(this.state.data);
    if (this.props.onChange)
      this.props.onChange(saveKey, value, parent, this.state.data);
  };

  render() {
    let elems = [];
    let { view, collapsible, synchronizedCollapse, styles } = this.props;
    let { data, collapsedNodes } = this.state;
    this.recursiveParseData("root", "", data, elems, 0);
    if (view === "single") {
      return <div style={styles.root}>{elems}</div>;
    } else if (view === "dual") {
      return (
        <div style={styles.dualView}>
          <div style={styles.jsonEditor}>{elems}</div>
          <div style={styles.jsonViewer}>
            <JSONViewer
              data={data.root}
              collapsible={collapsible}
              collapsedNodes={synchronizedCollapse ? collapsedNodes : {}}
              styles={styles}
            />
          </div>
        </div>
      );
    }
  }
}
