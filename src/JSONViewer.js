import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep} from 'lodash';

export default class JSONViewer extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep:2, //no of spaces to the left per nested object
    collapsed: true, //whether nodes are collapsed or not
  };

  constructor(props){
    super(props);
    const data = {root: props.data};
    this.state = {
      data: data
    };
  }

  parseArray(prevKey, data, parent, elems, marginLeft, isLastSibling){
    elems.push(
      this.getLabelAndValue(prevKey, "[", parent, "builtin", marginLeft, true) //opening array tag
    );

    let prevIsLastSibling = isLastSibling;
    for(let key = 0; key < data.length; key++){
      isLastSibling = key === data.length - 1;
      elems.push(<br/>);
      this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep, isLastSibling);
    }
    elems.push(<br/>);
    elems.push(this.getLabel(']', 'builtin', marginLeft, prevIsLastSibling)); //closing array tag
  }

  parseObject(prevKey, data, parent, elems, marginLeft, isLastSibling){
    elems.push(
      this.getLabelAndValue(prevKey, "{", parent, "builtin", marginLeft, true) //opening object tag
    );

    let keys = Object.keys(data);
    let count = 0;
    let prevIsLastSibling = isLastSibling;
    keys.map(key => {
      isLastSibling = ++count === keys.length ? true : false;
      elems.push(<br/>);
      this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep, isLastSibling);
    });

    elems.push(<br/>)
    elems.push(this.getLabel('}', 'builtin', marginLeft, prevIsLastSibling)); //closing object tag
  }

  getDataType(data){
    if(isArray(data)) return "array";
    else if(isObject(data)) return "object";
    else if(isNumber(data)) return "number";
    else if(isString(data)) return "string";
    else if(isBoolean(data)) return "boolean";
    else return "builtin";
  }

  recursiveParseData(prevKey, parent, elems, marginLeft, isLastSibling){
    //special case to check for root object
    //otherwise it would have been let data = parent[prevKey]
    let data = parent[prevKey]; 
    switch(this.getDataType(data)){
      case "array":
        this.parseArray(prevKey, data, parent, elems, marginLeft, isLastSibling);
        break;
      case "object":
        this.parseObject(prevKey, data, parent, elems, marginLeft, isLastSibling);
        break;
      case "number":
        elems.push(
          this.getLabelAndValue(prevKey, data, parent, "number", marginLeft, isLastSibling)
        );
        break;
      case "string":
        elems.push(
          this.getLabelAndValue(prevKey, data, parent, "text", marginLeft, isLastSibling)
        );
        break;
      case "boolean":
        elems.push(
          this.getLabelAndValue(prevKey, data, parent, "boolean", marginLeft, isLastSibling)
        );
        break;
      default:
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

const printSpaces = (marginLeft) => {
  //we would have used css to set a margin left
  //but that makes the json lose its formatting when copied
  let spaces = [];
  for(let x = 0; x < marginLeft; x++){
    spaces.push(<span>&nbsp;</span>);
  }
  return <span>{spaces}</span>;
};

const Label = (props) => {
  let {marginLeft, value, hasChildren, type, isLastSibling} = props;
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
  let {label, marginLeft, type, value, isLastSibling} = props;
  return (
    <span>
      <Label 
        value={label}
        type="property" 
        isLastSibling={isLastSibling}
        marginLeft={marginLeft}/>
      <Label 
        value={value}
        type={type}
        isLastSibling={isLastSibling}
        marginLeft={1}/>
    </span>
  );
}

const styles = {
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