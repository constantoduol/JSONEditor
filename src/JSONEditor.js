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
    let style = merge({marginLeft, marginBottom}, styles.text);
    return (
      <div style={style}>
        <label style={styles.label}>{key}</label>
        <input type="text" value={txt}/>
      </div>
    );
  }

  renderNumber(key, num, marginLeft){
    let {marginBottom} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.number);
    return (
      <div style={style}>
        <label style={styles.label}>{key}</label>
        <input type="number" value={num}/>
      </div>
    );
  }

  renderBoolean(key, val, marginLeft){
    let style = merge({marginLeft}, styles.boolean);
    return (
      <select style={style}>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  }

  renderLabel(label, marginLeft){
    let style = merge({marginLeft}, styles.label);
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
        elems.push(<br/>);
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
    return <div>{elems}</div>
  }
}

const styles = {
  label: {
    color: "#2196F3"
  }
};