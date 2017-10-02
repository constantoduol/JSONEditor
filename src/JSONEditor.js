import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge} from 'lodash';

export default class JSONEditor extends React.Component{

  static defaultProps = {
    data: {},
    marginLeftStep: 10,
    marginBottom: 5
  }

  parseData(){
    let {data} = this.props;

  }

  renderText(key, txt, marginLeft){
    let {marginBottom} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.row);
    return (
      <div style={style}>
        <div style={styles.label}>{key}</div>
        <div style={styles.value}>
          <input style={styles.input} type="text" value={txt}/>
        </div>
      </div>
    );
  }

  renderNumber(key, num, marginLeft){
    let {marginBottom} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.row);
    return (
      <div style={style}>
        <div style={styles.label}>{key}</div>
        <div style={styles.value}>
          <input style={styles.input} type="number" value={num}/>
        </div>
      </div>
    );
  }

  renderBoolean(key, val, marginLeft){
    let style = merge({marginLeft}, styles.row);
    return (
      <div style={style}>
        <div style={styles.label}>{key}</div>
        <div style={styles.value}>
          <select style={styles.select}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      </div>
    );
  }

  renderLabel(label, marginLeft){
    let style = merge({marginLeft}, styles.nestedLabel);
    return (
      <label style={style}>{label}</label>
    );
  }


  recursiveParseData(prevKey, data, elems, marginLeft){
    if(isArray(data)){
      elems.push(this.renderLabel(prevKey, marginLeft));
      for(let val of data){
        this.recursiveParseData(val, elems, marginLeft);
      }
    } else if(isObject(data)){
      elems.push(this.renderLabel(prevKey, marginLeft));
      Object.keys(data).map(key => {
        this.recursiveParseData(key, data[key], elems, marginLeft + this.props.marginLeftStep);
      })
    } else if(isNumber(data)){
      elems.push(this.renderNumber(prevKey, data, marginLeft));
    } else if(isString(data)) {
      elems.push(this.renderText(prevKey, data, marginLeft));
    } else if(isBoolean(data)){
      elems.push(this.renderBoolean(prevKey, data, marginLeft));
    }
  }

  render(){
    let elems = [];
    this.recursiveParseData('', this.props.data, elems, 0);
    return <div style={styles.root}>{elems}</div>
  }
}

const styles = {
  label: {
    color: "#2196F3",
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
  nestedLabel: {
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