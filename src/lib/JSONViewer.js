import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean} from 'lodash';
import {CollapseIcon, isNodeCollapsed, toggleNodeCollapsed} from './CollapseIcon';

export default class JSONViewer extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep: 2, //no of spaces to the left per nested object
    collapsible: false, //whether nodes are collapsible or not
    collapsedNodes: {},
    styles: {styles} //pass to override styles
  };

  constructor(props){
    super(props);
    const data = {root: props.data};
    this.state = {
      data: data,
      collapsedNodes: this.props.collapsedNodes
    };
  }

  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps) !== JSON.stringify(this.state)){
      this.setState({
        data : {root: nextProps.data},
        marginLeftStep: nextProps.marginLeftStep,
        collapsible: nextProps.collapsible,
        collapsedNodes: nextProps.collapsedNodes,
        styles: nextProps.styles
      })
    }
  }

  parseArray(currentKey, parentKeyPath, data, parent, elems, marginLeft, isLastSibling){
    parentKeyPath = parentKeyPath + "_" + currentKey
    let {marginLeftStep} = this.props;
    if(marginLeft > 0){
      elems.push(
        this.getLabelAndValue(currentKey, parentKeyPath, "[", parent, "builtin", marginLeft, true), //opening array tag
        this.getCollapseIcon(marginLeft, currentKey, parentKeyPath)
      );
    } else {
      elems.push(
        this.getLabel("[", "builtin", marginLeft, true, currentKey, parentKeyPath), //opening array tag
        this.getCollapseIcon(marginLeft, currentKey, parentKeyPath)
      );
    }
    
    if(isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

    let prevIsLastSibling = isLastSibling;
    for(let key = 0; key < data.length; key++){
      isLastSibling = key === data.length - 1;
      elems.push(<br key={getKey('break', key, parentKeyPath, marginLeft)}/>);
      this.recursiveParseData(key, parentKeyPath, data, elems, marginLeft + marginLeftStep, isLastSibling);
    }
    elems.push(<br key={getKey('break', currentKey, parentKeyPath, marginLeft)}/>);
    elems.push(this.getLabel(']', 'builtin', marginLeft, prevIsLastSibling, currentKey, parentKeyPath)); //closing array tag
  }

  parseObject(currentKey, parentKeyPath, data, parent, elems, marginLeft, isLastSibling){
    parentKeyPath = parentKeyPath + "_" + currentKey
    let {marginLeftStep} = this.props;
    if(marginLeft > 0){ //special case to avoid showing root
      elems.push(
        this.getLabelAndValue(currentKey, parentKeyPath, "{", parent, "builtin", marginLeft, true, currentKey), //opening object tag
        this.getCollapseIcon(marginLeft, currentKey, parentKeyPath)
      );
    } else {
      elems.push(
        this.getLabel("{", "builtin", marginLeft, true, currentKey, parentKeyPath), //opening object tag
        this.getCollapseIcon(marginLeft, currentKey, parentKeyPath)
      );
    }

    if(isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

    let keys = Object.keys(data);
    let count = 0;
    let prevIsLastSibling = isLastSibling;
    keys.forEach(key => {
      isLastSibling = ++count === keys.length;
      elems.push(<br key={getKey('break', key, parentKeyPath, marginLeft)}/>);
      this.recursiveParseData(
        key, parentKeyPath, data, elems, marginLeft + marginLeftStep, isLastSibling);
    });

    elems.push(<br key={getKey('break', currentKey, parentKeyPath, marginLeft)}/>);
    elems.push(this.getLabel('}', 'builtin', marginLeft, prevIsLastSibling, currentKey, parentKeyPath)); //closing object tag
  }

  getDataType(data){
    if(isArray(data)) return "array";
    else if(isObject(data)) return "object";
    else if(isNumber(data)) return "number";
    else if(isString(data)) return "string";
    else if(isBoolean(data)) return "boolean";
    else return "builtin";
  }

  recursiveParseData(currentKey, parentKeyPath, parent, elems, marginLeft, isLastSibling){
    let data = parent[currentKey]; 
    switch(this.getDataType(data)){
      case "array":
        this.parseArray(currentKey, parentKeyPath, data, parent, elems, marginLeft, isLastSibling);
        break;
      case "object":
        this.parseObject(currentKey, parentKeyPath, data, parent, elems, marginLeft, isLastSibling);
        break;
      case "number":
        elems.push(
          this.getLabelAndValue(currentKey, parentKeyPath, data, parent, "number", marginLeft, isLastSibling)
        );
        break;
      case "string":
        elems.push(
          this.getLabelAndValue(currentKey, parentKeyPath, data, parent, "text", marginLeft, isLastSibling)
        );
        break;
      case "boolean":
        elems.push(
          this.getLabelAndValue(currentKey, parentKeyPath, data, parent, "boolean", marginLeft, isLastSibling)
        );
        break;
      default:
        elems.push(
          this.getLabelAndValue(currentKey, parentKeyPath, data, parent, "builtin", marginLeft, isLastSibling)
        );
    }
    
  }

  getCollapseIcon(marginLeft, currentKey, parentKeyPath){
    let {collapsedNodes} = this.state;
    let {collapsible, marginLeftStep, styles} = this.props;
    return (
      <span key={getKey('collapse_and_remove', currentKey, parentKeyPath, marginLeft)}>
        <CollapseIcon 
          collapsedNodes={collapsedNodes} 
          marginLeft={marginLeft} 
          collapsible={collapsible} 
          currentKey={currentKey}
          styles={styles}
          isNodeCollapsed={isNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
          toggleNodeCollapsed={toggleNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
        />
      
      </span>
    )
  }

  getLabelAndValue(currentKey, parentKeyPath, value, parent, type, marginLeft, isLastSibling){
    const {styles} = this.props;
    if(isArray(parent)){
      //for arrays we dont show keys
      return this.getLabel(value, type, marginLeft, isLastSibling, currentKey, parentKeyPath);
    } else {
      return (
        <LabelAndValue 
          key={getKey('label_and_value', currentKey, parentKeyPath, marginLeft)}
          currentKey={currentKey}
          value={value}
          type={type}
          parent={parent}
          marginLeft={marginLeft}
          isLastSibling={isLastSibling}
          styles={styles}/>
      );
    }
  }

  getLabel(value, type, marginLeft, isLastSibling, currentKey, parentKeyPath){
    const {styles} = this.props;
    return (
      <Label 
        key={getKey('label', currentKey + value, parentKeyPath, marginLeft)}
        value={value}
        type={type} 
        marginLeft={marginLeft}
        isLastSibling={isLastSibling}
        styles={styles}/>
    )
  }

  render(){
    let elems = [];
    const {styles} = this.props;
    this.recursiveParseData("root", '', this.state.data, elems, 0, true);
    return <div style={styles.root}>{elems}</div>
  }
}

const printSpaces = (marginLeft) => {
  //we would have used css to set a margin left
  //but that makes the json lose its formatting when copied
  let spaces = [];
  for(let x = 0; x < marginLeft; x++){
    spaces.push(<span key={x}>&nbsp;</span>);
  }
  return <span>{spaces}</span>;
};

const getKey = (prefix, currentKey, parentKeyPath, marginLeft) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`
}

const Label = (props) => {
  let {marginLeft, value, type, isLastSibling, styles} = props;
  let style = styles.text;
  switch(type){
    case "number":
      style = styles.number;
      if(!isLastSibling) value = value + ",";
      break;
    case "boolean":
      style = styles.builtin;
      value = value + ""; //coerce boolean to string, seems you cant return booleans in react elements
      if(!isLastSibling) value = value + ",";
      break;
    case "property":
      style = styles.property;
      value = "\"" + value + "\":"; //add quotes to string
      break;
    case "builtin":
      style = styles.builtin;
      value = value + "";
      if(!isLastSibling) value = value + ",";
      break;
    default:
      style = styles.text;
      if(isLastSibling)
        value = "\"" + value + "\"";
      else
        value = "\"" + value + "\",";
  }
  return (
    <span style={style}>{printSpaces(marginLeft)}{value}</span>
  );
}

const LabelAndValue = (props) => {
  let {currentKey, marginLeft, type, value, isLastSibling, styles} = props;
  return (
    <span key={`label_and_value_${currentKey}`}>
      <Label 
        value={currentKey}
        type="property" 
        isLastSibling={isLastSibling}
        marginLeft={marginLeft}
        styles={styles}/>
      <Label 
        value={value}
        type={type}
        isLastSibling={isLastSibling}
        marginLeft={1}
        styles={styles}/>
    </span>
  );
}

const styles = {
  root: {
    margin: 5,
    fontSize: 14,
    fontFamily: "monospace"
  },
  builtin: {
    color: "#00f"
  },
  text: {
    color: "#077"
  },
  number: {
    color: "#a0a"
  },
  property: {
    color: "#c00"
  },
  collapseIcon: {
    cursor: "pointer"
  }
};