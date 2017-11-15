
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


