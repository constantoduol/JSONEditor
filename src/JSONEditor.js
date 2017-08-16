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

  renderText(txt, marginLeft){
    let {marginBottom} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.text);
    return (
      <input type="text" value={txt} style={style}/>
    );
  }

  renderNumber(num, marginLeft){
    let {marginBottom} = this.props;
    let style = merge({marginLeft, marginBottom}, styles.number);
    return (
      <input type="number" value={num} style={style}/>
    );
  }

  renderBoolean(val, marginLeft){
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


  recursiveParseData(data, elems, marginLeft){
    if(isArray(data)){
      for(let val of data){
        this.recursiveParseData(val, elems, marginLeft);
      }
    } else if(isObject(data)){
      Object.keys(data).map(key => {
        let isParent
        elems.push(this.renderLabel(key, marginLeft + this.props.marginLeftStep));
        elems.push(<br/>);
        this.recursiveParseData(data[key], elems, marginLeft + this.props.marginLeftStep);
        elems.push(<br/>);
      })
    } else if(isNumber(data)){
      elems.push(this.renderNumber(data, marginLeft));
    } else if(isString(data)) {
      elems.push(this.renderText(data, marginLeft));
    } else if(isBoolean(data)){
      elems.push(this.renderBoolean(data, marginLeft));
    }
  }

  render(){
    let elems = [];
    this.recursiveParseData(this.props.data, elems, 0);
    return <div>{elems}</div>
  }
}

const styles = {
  label: {
    color: "#2196F3"
  }
};