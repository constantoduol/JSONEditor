import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep} from 'lodash';

export default class JSONViewer extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep:15, //indentation step for nested objects
    marginBottom: 5, //margin bottom of nodes
    collapsed: true, //whether nodes are collapsed or not
  };

  constructor(props){
    super(props);
    const data = {root: cloneDeep(props.data)};
    this.state = {
      data: data
    };
  }

  recursiveParseData(prevKey, parent, elems, marginLeft){
    //special case to check for root object
    //otherwise it would have been let data = parent[prevKey]
    let isRoot = prevKey === '{';
    let data = isRoot ? parent : parent[prevKey]; 
    if(isArray(data)){
      elems.push(
        this.getLabelAndValue(prevKey, "[", parent, "builtin", marginLeft) //opening array tag
      );

      for(let key = 0; key < data.length; key++){
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      }

      elems.push(this.getLabel(']', 'builtin', marginLeft)); //closing array tag

    } else if(isObject(data)){
        elems.push(
          this.getLabelAndValue(prevKey, "{", parent, "builtin", marginLeft) //opening object tag
        );

      Object.keys(data).map(key => {
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      });

      elems.push(this.getLabel('}', 'builtin', marginLeft)); //closing object tag

    } else if(isNumber(data)){
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "number", marginLeft)
      );
    } else if(isString(data)) {
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "text", marginLeft)
      );
    } else if(isBoolean(data)){
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "boolean", marginLeft)
      );
    } else {
      //null, undefined etc
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "builtin", marginLeft)
      );
    }
  }

  getLabelAndValue(key, value, parent, type, marginLeft){
    if(isArray(parent)){
      //for arrays we dont show keys
      return this.getLabel(value, type, marginLeft);
    } else {
      return (
        <LabelAndValue 
          label={key}
          value={value}
          type={type} 
          marginLeft={marginLeft}/>
      );
    }
  }

  getLabel(value, type, marginLeft){
    return (
      <Label 
        value={value}
        type={type} 
        marginLeft={marginLeft}/>
    )
  }

  render(){
    let elems = [];
    this.recursiveParseData("root", this.state.data, elems, 0);
    return <div style={styles.root}>{elems}</div>
  }
}

const Label = (props) => {
  let {marginLeft, value, hasChildren, type} = props;
  let style = styles.text;
  switch(type){
    case "number":
      style = styles.number;
      value = value + ",";
      break;
    case "boolean":
      style = styles.builtin;
      value = value + ","; //corce boolean to string, seems you cant return booleans in react elements
      break;
    case "property":
      style = styles.property;
      value = "\"" + value + "\":"; //add quotes to string
      break;
    case "builtin":
      style = styles.builtin;
      if(value === "[" || value === "{")
        value = value + "";
      else
        value = value + ","; //corce to string e.g null, undefined etc
      break;
    default:
      style = styles.text;
      value = "\"" + value + "\","; //add quotes to string
  }
  style = merge({marginLeft}, style);
  return (
    <div style={style}>{value}</div>
  );
}

const LabelAndValue = (props) => {
  let {label, marginLeft, type, value} = props;
  return (
    <div style={styles.row}>
      <Label 
        value={label}
        type="property" 
        marginLeft={marginLeft}/>
      <Label 
        value={value}
        type={type}
        marginLeft={5}/>
    </div>
  );
}

const styles = {
  row: {
    display: "flex" 
  },
  root: {
    margin: 5,
    fontSize: 12,
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
  }
};