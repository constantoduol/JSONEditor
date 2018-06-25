import React from 'react';

const CollapseIcon = (props) => {
  let {collapsible, toggleNodeCollapsed, isNodeCollapsed} = props;
  if(!collapsible) return null;
  return isNodeCollapsed() ? 
    <span 
      onClick={toggleNodeCollapsed} 
      style={styles.collapseIcon}>&#9658;</span> : 
    <span 
      onClick={toggleNodeCollapsed}  
      style={styles.collapseIcon}>&#9660;</span>
}

function toggleNodeCollapsed(marginLeft, key, marginLeftStep) {
  let {collapsedNodes} = this.state;
  let level = marginLeft/marginLeftStep;
  let keys = collapsedNodes[level] || {};

  if(keys[key]) delete keys[key]; //keys[key] = false ?
  else keys[key] = true;
  collapsedNodes[level] = keys;

  this.setState({collapsedNodes});
}

function isNodeCollapsed(marginLeft, key, marginLeftStep) {
  let {collapsedNodes} = this.state;
  let level = marginLeft/marginLeftStep;
  if(!collapsedNodes[level]) return false;
  return collapsedNodes[level][key];
}

const styles = {
  collapseIcon: {
  	cursor: "pointer"
  }
};

export {CollapseIcon, toggleNodeCollapsed, isNodeCollapsed};