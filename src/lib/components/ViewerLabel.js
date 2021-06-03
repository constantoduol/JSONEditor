import React from 'react';
import { printSpaces } from "./PrintSpaces"

export const ViewerLabel = (props) => {
    let {marginLeft, value, type, isLastSibling, styles} = props;
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
