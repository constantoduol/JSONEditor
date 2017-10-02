import React from 'react';
import {isArray, isObject, isNumber, isString, isBoolean, merge} from 'lodash';

export default class JSONEditor extends React.Component {

  static defaultProps = {
    data: {},
    marginLeftStep: 10,
    marginBottom: 5,
    collapsed: true
  }


  recursiveParseData(prevKey, data, elems, marginLeft){
    if(isArray(data)){
      elems.push(
        <_Label 
          value={prevKey} 
          marginLeft={marginLeft}
          hasChildren/>
      );

      for(let val of data){
        this.recursiveParseData(val, elems, marginLeft);
      }

    } else if(isObject(data)){

      elems.push(
        <_Label 
          value={prevKey} 
          marginLeft={marginLeft}
          hasChildren/>
      );

      Object.keys(data).map(key => {
        this.recursiveParseData(key, data[key], elems, marginLeft + this.props.marginLeftStep);
      });

    } else if(isNumber(data)){
      elems.push(
        <_Number 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          label={prevKey} 
          value={data}/>
      );
    } else if(isString(data)) {
      elems.push(
        <_Text 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          label={prevKey} 
          value={data}/>
      );
    } else if(isBoolean(data)){
      elems.push(
        <_Boolean 
          marginLeft={marginLeft} 
          marginBottom={this.props.marginBottom}
          label={prevKey} 
          value={data}/>
      );
    }
  }

  render(){
    let elems = [];
    this.recursiveParseData('', this.props.data, elems, 0);
    return <div style={styles.root}>{elems}</div>
  }
}

const _Text = (props) => {
  let {marginLeft, marginBottom, label, value} = props;
  let style = merge({marginLeft, marginBottom}, styles.row);
  return (
    <div style={style}>
      <_Label 
        value={label} 
        marginLeft={0}
        hasChildren={false}/>
      <div style={styles.value}>
        <input style={styles.input} type="text" value={value}/>
      </div>
    </div>
  )
}

const _Number = (props) => {
  let {marginLeft, marginBottom, label, value} = props;
  let style = merge({marginLeft, marginBottom}, styles.row);
  return (
    <div style={style}>
      <_Label 
        value={label} 
        marginLeft={0}
        hasChildren={false}/>
      <div style={styles.value}>
        <input style={styles.input} type="number" value={value}/>
      </div>
    </div>
  )
}

const _Boolean = (props) => {
  let {marginLeft, marginBottom, label, value} = props;
  let style = merge({marginLeft, marginBottom}, styles.row);
  return (
    <div style={style}>
      <_Label 
        value={label} 
        marginLeft={0}
        hasChildren={false}/>
      <div style={styles.value}>
        <select style={styles.select} value={value}>
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