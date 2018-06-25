### Getting started

`npm install react-json-editor-viewer`

### Easily view json in react

```javascript
import {JSONViewer} from 'react-json-editor-viewer';



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

```
![Alt text](images/jsonviewer.png?raw=true "JSON Viewer")

### Make your json viewer collapsible

```javascript
import {JSONViewer} from 'react-json-editor-viewer';

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
  collapsible
/>
```

![Alt text](images/jsonviewer_collapse.png?raw=true "JSON Viewer")

### Edit json easily and listen to changes in the data

```javascript
import {JSONEditor} from 'react-json-editor-viewer';

constructor(){
  this.onJsonChange = this.onJsonChange.bind(this);
}

onJsonChange(key, value, parent, data){
  console.log(key, value, parent, data);
}

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
```

![Alt text](images/jsoneditor.png?raw=true "JSON Viewer")

### View both the json editor and viewer side by side


```javascript
import {JSONEditor} from 'react-json-editor-viewer';

constructor(){
  this.onJsonChange = this.onJsonChange.bind(this);
}

onJsonChange(key, value, parent, data){
  console.log(key, value, parent, data);
}

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
  view="dual"
/>
```
![Alt text](images/jsoneditor_dual.png?raw=true "JSON Viewer")


### License: MIT