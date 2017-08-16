import React from 'react';
import PropTypes from 'prop-types';
import {isArray, isObject, isNumber, isString, isBoolean} from 'lodash';

export default class JSONEditor extends React.Component{

  static propTypes = {
    data: PropTypes.object //the javascript object
  };

  parseData(){
    let {data} = this.props;

  }

  renderText(){
    return 
  }

  renderNumber(){

  }

  renderBoolean(){

  }

  recursiveParseData(data){
    if(isArray(data)){
      for(let val of data){
        this.recursiveParseData(val);
      }
    } else if(isObject(data)){
      Object.keys(data).map(key => {
        this.recursiveParseData(data[key]);
      })
    } else if(isNumber(data)){
      //number

    } else if(isString(data)) {
      //text
    } else if(isBoolean(data)){
      //bool
    }
  }

  render(){
    return <div>hello world</div>
  }
}