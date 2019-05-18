import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep} from 'lodash';
import JSONViewer from './JSONViewer';
import {CollapseIcon, isNodeCollapsed, toggleNodeCollapsed} from './CollapseIcon';

const EDIT_KEY = "__editable_json_editor__"

export default class JSONEditor extends React.Component {

  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep: 10, //indentation step for nested objects
    marginBottom: 4, //margin bottom of nodes
    collapsible: true, //whether nodes are collapsible or not
    //this prevents modifying the data you passed in however cloning is expensive especially for large objects
    cloneData: true,
    onChange: null, //data changed handler,
    view: "single", //dual, shows the editor and the json viewer side to side,
    collapsedNodes: {},
    synchronizedCollapse: true, //if in dual view when editor is collapsed, viewer is also collapsed 
    showAddNewButton: true,
    showRemoveButton: true
  }

  constructor(props){
    super(props);
    this.state = {
      data: {'root' : props.cloneData ? cloneDeep(props.data) : props.data},
      collapsedNodes: this.props.collapsedNodes
    };
  }

  getCollapseIcon(marginLeft, currentKey){
    let {collapsedNodes} = this.state;
    let {collapsible, marginLeftStep} = this.props;
    return (
      <CollapseIcon 
        collapsedNodes={collapsedNodes} 
        marginLeft={marginLeft} 
        collapsible={collapsible} 
        currentKey={currentKey}
        isNodeCollapsed={isNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
        toggleNodeCollapsed={toggleNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
      />
    )
  }

  dataChanged(key, parent, type, e){
    let value = this.castToType(e.target.value, type);
    parent[key] = value;
    this.setState(this.state.data);
    if(this.props.onChange) this.props.onChange(key, value, parent, this.state.data.root);
  }

  castToType(value, type){
    switch(type){
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

  recursiveParseData(currentKey, parentKeyPath, parent, elems, marginLeft){
    parentKeyPath = parentKeyPath + "_" + currentKey
    let data = parent[currentKey]; 
    let label = currentKey;
    let {marginLeftStep} = this.props;

    if(isArray(parent)) {
      label += 1;
      label += "."
    }

    if(isArray(data)){
      if(marginLeft > 0){ //special case to avoid showing root
        elems.push(
          <ParentLabel
            key={getKey('parent_label', currentKey, parentKeyPath, marginLeft)} 
            value={label}
            addElement={this.addElement}
            removeElement={this.removeElement}
            current={data} 
            parent={parent}
            marginLeft={marginLeft}
            currentKey={currentKey}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if(isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

      for(let key = 0; key < data.length; key++){
        this.recursiveParseData(key, parentKeyPath, data, elems, marginLeft + marginLeftStep);
      }

    } else if(isObject(data)){

      if(marginLeft > 0){//special case to avoid showing root
        elems.push(
          <ParentLabel
            key={getKey('parent_label', currentKey, parentKeyPath, marginLeft)}  
            value={label} 
            addElement={this.addElement}
            removeElement={this.removeElement}
            current={data}
            parent={parent}
            marginLeft={marginLeft}
            currentKey={currentKey}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if(isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

      Object.keys(data).forEach(key => {
        this.recursiveParseData(key, parentKeyPath, data, elems, marginLeft + marginLeftStep);
      });

    } else if(isNumber(data)){
      elems.push(
        <Input
          key={getKey('input', currentKey, parentKeyPath, marginLeft)}  
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
          saveElement={this.saveElement}
          label={label} 
          type="number"
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, 'number')}
          value={data}/>
      );
    } else if(isString(data)) {
      elems.push(
        <Input 
          key={getKey('input', currentKey, parentKeyPath, marginLeft)}  
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
          saveElement={this.saveElement}
          label={label} 
          type="text"
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, 'text')}
          value={data}/>
      );
    } else if(isBoolean(data)){
      elems.push(
        <Boolean 
          key={getKey('boolean', currentKey, parentKeyPath, marginLeft)} 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          removeElement={this.removeElement}
          parent={parent}
          currentKey={currentKey}
          onChange={this.dataChanged.bind(this, currentKey, parent, 'boolean')}
          label={label} 
          value={data}/>
      );
    }

  }

  addElement = (parent) => {
    let newKey = null;
    if(isArray(parent)){
      parent.push("")
      newKey = parent.length - 1;
    } else {
      newKey = EDIT_KEY
      parent[newKey] = ""
    }
    this.setState({data: this.state.data});
    if(this.props.onChange) this.props.onChange(newKey, null, parent, this.state.data);
  }

  removeElement = (parent, removeKey) => {
    let currentValue = parent[removeKey];
    if(isArray(parent)){
      parent.splice(removeKey, 1)
    } else {
      delete parent[removeKey];
    }
    this.setState(this.state.data);
    if(this.props.onChange) this.props.onChange(removeKey, currentValue, parent, this.state.data);
  }

  saveElement = (parent, saveKey) => {
    let value = parent[EDIT_KEY]
    parent[saveKey] = value
    delete parent[EDIT_KEY]
    this.setState(this.state.data);
    if(this.props.onChange) this.props.onChange(saveKey, value, parent, this.state.data);
  }

  render(){
    let elems = [];
    let {view, collapsible, synchronizedCollapse} = this.props;
    let {data, collapsedNodes} = this.state;
    this.recursiveParseData('root', '', data, elems, 0);
    if(view === "single"){
      return <div style={styles.root}>{elems}</div>
    } else if(view === "dual"){
      return (
        <div style={styles.dualView}>
          <div style={styles.jsonEditor}>{elems}</div>
          <div style={styles.jsonViewer}>
            <JSONViewer 
              data={data.root} 
              collapsible={collapsible} 
              collapsedNodes={synchronizedCollapse ? collapsedNodes : {}}/>
          </div>
        </div>
      )
    }
  }
}

class Input extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hovering: false,
      editableInput: null,
    }
  }

  hoverStarted = () => {
    this.setState({hovering: true})
  }

  hoverStopped = () => {
    this.setState({hovering: false})
  }

  onEditableInputChange = event => {
    this.setState({editableInput: event.target.value})
  }

  onSaveElement = () => {
    let {saveElement, parent} = this.props;
    let {editableInput} = this.state;
    saveElement(parent, editableInput)
  }

  render(){
    let {marginLeft, marginBottom, label, value, type, onChange, removeElement, parent, currentKey} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.row);
    return (
      <div 
          style={style}   
          onMouseEnter={this.hoverStarted}
          onMouseLeave={this.hoverStopped}>
        <Label 
          value={label}
          onEditableInputChange={this.onEditableInputChange} 
          marginLeft={0}/>
        <div style={styles.value}>
          <input style={styles.input} type={type} value={value} onChange={onChange}/>
        </div>
        <div hidden={label !== EDIT_KEY}>
          <SaveIcon
            saveIn={parent}
            saveKey={label}
            saveElement={this.onSaveElement}
          />
        </div>
        <div hidden={!this.state.hovering}>
          <RemoveIcon 
            removeFrom={parent} 
            removeKey={currentKey} 
            removeElement={removeElement}/>
        </div>
      </div>
    )
  }
}


class Boolean extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hovering: false
    }
  }

  hoverStarted = () => {
    this.setState({hovering: true})
  }

  hoverStopped = () => {
    this.setState({hovering: false})
  }

  render(){
    let {marginLeft, marginBottom, label, value, onChange, current, currentKey, removeElement} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.row);
    return (
      <div 
          style={style} 
          onMouseEnter={this.hoverStarted}
          onMouseLeave={this.hoverStopped}>
        <Label 
          value={label} 
          marginLeft={0}/>
        <div style={styles.value}>
          <select style={styles.select} value={value} onChange={onChange}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div hidden={!this.state.hovering}>
          <RemoveIcon 
            removeFrom={current} 
            removeKey={currentKey} 
            removeElement={removeElement}/>
        </div>
      </div>
    );
  }
}

const Label = (props) => {
  let {marginLeft, value, onEditableInputChange} = props;
  if(value === EDIT_KEY){
    return (
      <div>
        <input style={styles.input} type="text" onChange={onEditableInputChange}/>
      </div>
    )
  }

  let style = merge({marginLeft}, styles.label);
  return (
    <div style={style}>{value}</div>
  );
}

class ParentLabel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hovering: false
    }
  }
  
  hoverStarted = () => {
    this.setState({hovering: true})
  }

  hoverStopped = () => {
    this.setState({hovering: false})
  }

  render(){
    let {marginLeft, value, currentKey, getCollapseIcon, addElement, removeElement, current, parent} = this.props;
    let style = merge({marginLeft: marginLeft, display: "flex"}, styles.label);
    return (
      <div 
          style={style} 
          onMouseEnter={this.hoverStarted}
          onMouseLeave={this.hoverStopped}>
        <div>{value}</div>
        <div 
          title="collapse node"
          style={{marginLeft: 5}}>
            {getCollapseIcon(marginLeft, currentKey)}
        </div>
        <div 
          hidden={!this.state.hovering}
          style={{marginLeft: 10}}>
            <AddIcon
              addElement={addElement} 
              addTo={current}
            />
            <RemoveIcon 
              removeFrom={parent} 
              removeKey={currentKey} 
              removeElement={removeElement}/>
        </div>
      </div>
    );
  }
}



const RemoveIcon = (props) => {
  let {removeElement, removeFrom, removeKey} = props;
  return (
    <span title="remove item" onClick={() => removeElement(removeFrom, removeKey)}>
      <span style={styles.removeButton}>&#215;</span>
    </span>
  )
}


const SaveIcon = (props) => {
  let {saveElement, saveIn, saveKey} = props;
  return (
    <span title="save item" onClick={() => saveElement(saveIn, saveKey)}>
      <span style={styles.saveButton}>&#10003;</span>
    </span>
  )
}

const AddIcon = (props) => {
  let {addElement, addTo} = props;
  return (
    <span title="add item" onClick={() => addElement(addTo)}>
      <span style={styles.addButton}>&#43;</span>
    </span>
  )
}

const getKey = (prefix, currentKey, parentKeyPath, marginLeft) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`
}

const styles = {
  dualView: {
    display: "flex"
  },
  jsonViewer: {
    borderLeft: "1px solid lightgrey",
    width: "50%",
    margin: 10
  },
  jsonEditor: {
    width: "50%",
    fontSize: 14,
    fontFamily: "monospace",
    margin: 10
  },
  label: {
    color: "#c00",
    marginTop: 4
  },
  value: {
   marginLeft: 10
  },
  row: {
    display: "flex",
  },
  root: {
    fontSize: 14,
    fontFamily: "monospace"
  },
  withChildrenLabel: {
    color: "#a52a2a"
  },
  select: {
    borderRadius: 3,
    borderColor: "#d3d3d3"
  },
  input: {
    borderRadius: 3,
    border: "1px solid #d3d3d3",
    padding: 3
  },
  addButton: {
    cursor: "pointer",
    color: "black",
    marginLeft:15,
    fontSize: 14
  },
  removeButton: {
    cursor: "pointer",
    color: "red",
    marginLeft: 15,
    fontSize: 14
  },
  saveButton: {
    cursor: "pointer",
    color: "green",
    marginLeft: 15,
    fontSize: 14
  }
};