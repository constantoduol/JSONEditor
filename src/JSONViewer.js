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
    const data = {root: props.data};
    this.state = {
      data: data
    };
  }

  recursiveParseData(prevKey, parent, elems, marginLeft, isLastSibling){
    //special case to check for root object
    //otherwise it would have been let data = parent[prevKey]
    let data = parent[prevKey]; 
    if(isArray(data)){
      elems.push(
        this.getLabelAndValue(prevKey, "[", parent, "builtin", marginLeft, false) //opening array tag
      );

      for(let key = 0; key < data.length; key++){
        isLastSibling = key === data.length - 1;
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep, isLastSibling);
      }

      elems.push(this.getLabel(']', 'builtin', marginLeft, isLastSibling)); //closing array tag

    } else if(isObject(data)){
      elems.push(
        this.getLabelAndValue(prevKey, "{", parent, "builtin", marginLeft, false) //opening object tag
      );

      let keys = Object.keys(data);
      let count = 0;
      keys.map(key => {
        if(count++ === keys.length) isLastSibling = true;
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep, isLastSibling);
      });

      elems.push(this.getLabel('}', 'builtin', marginLeft, isLastSibling)); //closing object tag

    } else if(isNumber(data)){
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "number", marginLeft, isLastSibling)
      );
    } else if(isString(data)) {
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "text", marginLeft, isLastSibling)
      );
    } else if(isBoolean(data)){
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "boolean", marginLeft, isLastSibling)
      );
    } else {
      //null, undefined etc
      elems.push(
        this.getLabelAndValue(prevKey, data, parent, "builtin", marginLeft, isLastSibling)
      );
    }
  }

  getLabelAndValue(key, value, parent, type, marginLeft, isLastSibling){
    //console.log(isLastSibling)
    if(isArray(parent)){
      //for arrays we dont show keys
      return this.getLabel(value, type, marginLeft, isLastSibling);
    } else {
      return (
        <LabelAndValue 
          label={key}
          value={value}
          type={type} 
          marginLeft={marginLeft}
          isLastSibling={isLastSibling}/>
      );
    }
  }

  getLabel(value, type, marginLeft, isLastSibling){
    return (
      <Label 
        value={value}
        type={type} 
        marginLeft={marginLeft}
        isLastSibling={isLastSibling}/>
    )
  }

  render(){
    let elems = [];
    this.recursiveParseData("root", this.state.data, elems, 0, true);
    return <div style={styles.root}>{elems}</div>
  }
}

const Label = (props) => {
  let {marginLeft, value, hasChildren, type, isLastSibling} = props;
  console.log(isLastSibling)
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
  let {label, marginLeft, type, value, isLastSibling} = props;
  //console.log(isLastSibling)
  return (
    <div style={styles.row}>
      <Label 
        value={label}
        type="property" 
        isLastSibling={isLastSibling}
        marginLeft={marginLeft}/>
      <Label 
        value={value}
        type={type}
        isLastSibling={isLastSibling}
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