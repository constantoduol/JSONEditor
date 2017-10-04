import React from 'react';
import ReactDOM from 'react-dom';
import JSONEditor from './JSONEditor';
import './index.css';

let data = {
    name: "constant", 
    age: 20, 
    city: "nairobi", 
    work: "engineer", 
    humans: {
      name: "brad", 
      age: 30,
      isHuman: false,
      greatest: ["mandela", "teresa", "luther"]
    },
    men: {
      we: "are",
      the: "men",
      women: {
        came: "from",
        men: "also",
        isWoman: true
      }
    }
};

ReactDOM.render(
  <JSONEditor data={data} onChange={(key, value, parent, data) => console.log(key, value, parent, data)}/>, 
  document.getElementById('root')
);

console.log(data);