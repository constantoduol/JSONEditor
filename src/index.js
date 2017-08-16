import React from 'react';
import ReactDOM from 'react-dom';
import JSONEditor from './JSONEditor';
import './index.css';

ReactDOM.render(
  <JSONEditor data={{
    name: "constant", 
    age: 20, 
    city: "nairobi", 
    work: "engineer", 
    humans: {
      name: "brad", 
      age: 30
    },
    men: {
      we: "are",
      the: "men",
      women: {
        came: "from",
        men: "also"
      }
    }
  }}/>, 
  document.getElementById('root')
);
