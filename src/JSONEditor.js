import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep} from 'lodash';

export default class JSONEditor extends React.Component {

  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep: 10, //indentation step for nested objects
    marginBottom: 5, //margin bottom of nodes
    collapsed: true, //whether nodes are collapsed or not
    //this prevents modifying the data you passed in however cloning is expensive especially for large objects
    cloneData: true,
    onChange: null //data changed handler 
  }

  constructor(props){
    super(props);
    this.state = {
      data: props.cloneData ? cloneDeep(props.data) : props.data
    };
  }

  dataChanged(key, parent, type, e){
    let value = this.castToType(e.target.value, type);
    parent[key] = value;
    this.setState(this.state.data);
    if(this.props.onChange) this.props.onChange(key, value, parent, this.state.data);
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

  recursiveParseData(prevKey, parent, elems, marginLeft){
    //special case to check for root object
    //otherwise it would have been let data = parent[prevKey]
    let data = prevKey !== null ? parent[prevKey] : parent; 
    if(isArray(data)){
      elems.push(
        <_Label 
          value={prevKey} 
          marginLeft={marginLeft}
          hasChildren/>
      );

      for(let key = 0; key < data.length; key++){
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      }

    } else if(isObject(data)){

      elems.push(
        <_Label 
          value={prevKey} 
          marginLeft={marginLeft}
          hasChildren/>
      );

      Object.keys(data).map(key => {
        this.recursiveParseData(key, data, elems, marginLeft + this.props.marginLeftStep);
      });

    } else if(isNumber(data)){
      elems.push(
        <_Input
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          label={prevKey} 
          type="number"
          onChange={this.dataChanged.bind(this, prevKey, parent, 'number')}
          value={data}/>
      );
    } else if(isString(data)) {
      elems.push(
        <_Input 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          label={prevKey} 
          type="text"
          onChange={this.dataChanged.bind(this, prevKey, parent, 'text')}
          value={data}/>
      );
    } else if(isBoolean(data)){
      elems.push(
        <_Boolean 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          onChange={this.dataChanged.bind(this, prevKey, parent, 'boolean')}
          label={prevKey} 
          value={data}/>
      );
    }
  }

  render(){
    let elems = [];
    this.recursiveParseData(null, this.state.data, elems, 0);
    return <div style={styles.root}>{elems}</div>
  }
}


const _Input = (props) => {
  let {marginLeft, marginBottom, label, value, type, onChange} = props;
  let style = merge({marginLeft, marginBottom}, styles.row);
  return (
    <div style={style}>
      <_Label 
        value={label} 
        marginLeft={0}
        hasChildren={false}/>
      <div style={styles.value}>
        <input style={styles.input} type={type} value={value} onChange={onChange}/>
      </div>
    </div>
  )
}

const _Boolean = (props) => {
  let {marginLeft, marginBottom, label, value, onChange} = props;
  let style = merge({marginLeft, marginBottom}, styles.row);
  return (
    <div style={style}>
      <_Label 
        value={label} 
        marginLeft={0}
        hasChildren={false}/>
      <div style={styles.value}>
        <select style={styles.select} value={value} onChange={onChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
}

const _Label = (props) => {
  let {marginLeft, value, hasChildren} = props;
  let style = hasChildren ? styles.withChildrenLabel : styles.label;
  style = merge({marginLeft}, style);
  return (
    <div style={style}>{value}</div>
  );
}

const styles = {
  label: {
    color: "#00f",
    width: "50%"
  },
  value: {
    width: "50%"
  },
  row: {
    display: "flex",
    width: 150
  },
  root: {
    margin: 5
  },
  withChildrenLabel: {
    color: "#a52a2a"
  },
  select: {
    borderRadius: 3,
    borderColor: "rgba(0, 0, 0, 0)"
  },
  input: {
    borderRadius: 3,
    border: "1px solid #d3d3d3",
    padding: 3
  }
};