import React from "react";

export const printSpaces = (marginLeft) => {
  //we would have used css to set a margin left
  //but that makes the json lose its formatting when copied
  let spaces = [];
  for (let x = 0; x < marginLeft; x++) {
    spaces.push(<span key={x}>&nbsp;</span>);
  }
  return <span>{spaces}</span>;
};
