import React from 'react';
import ReactDOM from 'react-dom';
import JSONEditor from './JSONEditor';
import JSONViewer from './JSONViewer';
import './index.css';

let data = {
    name: "constant", 
    age: 20, 
    people: null,
    who: undefined,
    city: "nairobi", 
    work: "engineer", 
    humans: {
      name: "brad", 
      age: 30,
      isHuman: false,
      greatest: ["mandela", "teresa", {others: ['newton', 'einstein']}]
    },
    men: {
      we: "are",
      the: "men",
      women: {
        came: "from",
        men: "also",
        isWoman: true,
        run: null
      }
    },
    villains: {
      name: 'constant'
    }
};

data = ["constant", "oduol", "is", "here", {"but": "he", "does": "not", "have": "much", "to": "say"}]

ReactDOM.render(
  <JSONEditor view="dual" data={data}/>, 
  document.getElementById('root')
);

console.log(data);