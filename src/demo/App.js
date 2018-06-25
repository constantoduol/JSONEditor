import React from 'react';
import {JSONViewer, JSONEditor} from '../lib';

const App = () => (
  <div>
    <JSONViewer 
      data={{
        the: "men",
        that: "landed",
        on: "the",
        moon: "were",
        maybe: 2,
        i: "think",
        probably: ["neil armstrong", "buzz aldrin"],
        am_i_right: true
      }}
    />
    <JSONEditor 
      data={{
        the: "men",
        that: "landed",
        on: "the",
        moon: "were",
        maybe: 2,
        i: "think",
        probably: ["neil armstrong", "buzz aldrin"],
        am_i_right: true
      }}
      collapsible
      onChange={this.onJsonChange}
    />
  </div>
);

export default App;
