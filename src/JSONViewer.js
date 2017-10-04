import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep} from 'lodash';

export default class JSONViewer extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep:15, //indentation step for nested objects
    marginBottom: 5, //margin bottom of nodes
    collapsed: true, //whether nodes are collapsed or not
  };

  recursiveParseData(prevKey, parent, elems, marginLeft){
    //special case to check for root object
    //otherwise it would have been let data = parent[prevKey]
    let data = prevKey !== null ? parent[prevKey] : parent; 
    if(isArray(data)){
      elems.push(
        <Label 
          value={prevKey} 
          type="property"
          marginLeft={marginLeft}
          hasChildren/>
      );

      for(let key = 0; key < data.length; key++){
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      }

    } else if(isObject(data)){

      elems.push(
        <Label 
          value={prevKey}
          type="property" 
          marginLeft={marginLeft}
          hasChildren/>
      );

      Object.keys(data).map(key => {
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      });

    } else if(isNumber(data)){
      elems.push(
        <LabelAndValue 
          label={prevKey}
          value={data}
          type="number" 
          marginLeft={marginLeft}/>
      );
    } else if(isString(data)) {
      elems.push(
        <LabelAndValue 
          label={prevKey}
          value={data}
          type="text" 
          marginLeft={marginLeft}/>
      );
    } else if(isBoolean(data)){
      elems.push(
        <LabelAndValue 
          label={prevKey}
          value={data}
          type="boolean" 
          marginLeft={marginLeft}/>
      );
    }
  }

  render(){
    let elems = [];
    this.recursiveParseData(null, this.props.data, elems, 0);
    return <div style={styles.root}>{elems}</div>
  }
}

const Label = (props) => {
  let {marginLeft, value, hasChildren, type} = props;
  let style = styles.text;
  switch(type){
    case "number":
      style = styles.number;
      break;
    case "boolean":
      style = styles.boolean;
      value = value + ""; //corce boolean to string
      break;
    case "property":
      style = styles.property;
      value = "\"" + value + "\":"; //add quotes to string
      break;
    default:
      style = styles.text;
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
    display: "flex",
    width: 150,
    fontWeight: "bold"
  },
  root: {
    margin: 5,
    fontSize: 12,
    fontFamily: "monospace"
  },
  boolean: {
    color: "#00f"
  },
  text: {
    color: "#077"
  },
  number: {
    color: "#a0a"
  },
  property: {
    color: "#c00",
    fontWeight: "bold"
  }
};