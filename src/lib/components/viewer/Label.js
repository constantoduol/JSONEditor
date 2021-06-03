import React from "react";

const printSpaces = (marginLeft) => {
  //we would have used css to set a margin left
  //but that makes the json lose its formatting when copied
  let spaces = [];
  for (let x = 0; x < marginLeft; x++) {
    spaces.push(<span key={x}>&nbsp;</span>);
  }
  return <span>{spaces}</span>;
};

const Label = (props) => {
  let { marginLeft, value, type, isLastSibling, styles } = props;
  let style = styles.text;
  switch (type) {
    case "number":
      style = styles.number;
      if (!isLastSibling) value = value + ",";
      break;
    case "boolean":
      style = styles.builtin;
      value = value + ""; //coerce boolean to string, seems you cant return booleans in react elements
      if (!isLastSibling) value = value + ",";
      break;
    case "property":
      style = styles.property;
      value = '"' + value + '":'; //add quotes to string
      break;
    case "builtin":
      style = styles.builtin;
      value = value + "";
      if (!isLastSibling) value = value + ",";
      break;
    default:
      style = styles.text;
      if (isLastSibling) value = '"' + value + '"';
      else value = '"' + value + '",';
  }
  return (
    <span style={style}>
      {printSpaces(marginLeft)}
      {value}
    </span>
  );
};

export default Label;
