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

function toggleNodeCollapsed(marginLeft, key) {
  let {collapsedNodes} = this.state;
  let keys = collapsedNodes[marginLeft] || {};

  if(keys[key]) delete keys[key]; //keys[key] = false ?
  else keys[key] = true;
  collapsedNodes[marginLeft] = keys;

  this.setState({collapsedNodes});
}

function isNodeCollapsed(marginLeft, key) {
  let {collapsedNodes} = this.state;
  if(!collapsedNodes[marginLeft]) return false;
  return collapsedNodes[marginLeft][key];
}

const styles = {
  collapseIcon: {
  	cursor: "pointer"
  }
};

export {CollapseIcon, toggleNodeCollapsed, isNodeCollapsed};