import React from 'react';
import {JSONViewer, JSONEditor} from '../lib';
// npm run build
// to compile a production version
//npm publish to publish

const App = () => (
  <div>
    <JSONEditor 
      data={data}
      view="dual"
      collapsible
      onChange={this.onJsonChange}
    />
      <JSONEditor
          data={data}
          view="dual"
          collapsible
          onChange={this.onJsonChange}
          styles={styles}
      />
  </div>
);

const styles = {
    dualView: {
        display: "flex",
        backgroundColor: "black"
    },
    jsonViewer: {
        borderLeft: "1px dashed white",
        width: "40%",
        margin: 5,
        lineHeight: 1.25
    },
    jsonEditor: {
        width: "60%",
        fontSize: 12,
        fontFamily: "Lucida Console, monospace",
        margin: 5,
        lineHeight: 1.25
    },
    root: {
        fontSize: 12,
        margin: 5,
        fontFamily: "Lucida Console, monospace",
        backgroundColor: "black",
        lineHeight: 1.25
        /*color: "#3E3D32"*/
    },
    label: {
        color: "DeepPink",
        marginTop: 3
    },
    value: {
        marginLeft: 10
    },
    row: {
        display: "flex",
    },
    withChildrenLabel: {
        color: "DeepPink"
    },
    select: {
        borderRadius: 3,
        borderColor: "grey",
        backgroundColor: "DimGray",
        color: "khaki"
    },
    input: {
        borderRadius: 3,
        border: "1px solid #272822",
        padding: 2,
        fontFamily: "Lucida Console, monospace",
        fontSize: 12,
        backgroundColor: "DimGray",
        color: "khaki",
        width: '200%'
    },
    addButton: {
        cursor: "pointer",
        color: "LightGreen",
        marginLeft:15,
        fontSize: 12
    },
    removeButton: {
        cursor: "pointer",
        color: "magenta",
        marginLeft: 15,
        fontSize: 12
    },
    saveButton: {
        cursor: "pointer",
        color: "green",
        marginLeft: 15,
        fontSize: 12
    },
    builtin: {
        color: "green",
        fontSize: 12
    },
    text: {
        color: "khaki",
        fontSize: 12,
    },
    number: {
        color: "purple",
        fontSize: 12
    },
    property: {
        color: "DeepPink",
        fontSize: 12
    },
    collapseIcon: {
        cursor: "pointer",
        fontSize: 8,
        color: "teal"
    }
};

const data = {
    "mobile": {
        "possibleCountryCodes": [
            "KE",
            "UG",
            "TZ"
        ],
        "possibleLengths": {
            "national": "5",
            "sub_national": "7",
        },
        "exampleNumber": 40123,
        "nationalNumberPattern": "4\\d{4}"
    },
    "id": "AC",
    "is_valid_number": true,
    "generalDesc": {
        "nationalNumberPattern": "[46]\\d{4}|[01589]\\d{5}"
    },
    "countryCode": "247",
    "uan": {
        "possibleLengths": {
            "national": "6"
        },
        "exampleNumber": 542011,
        "nationalNumberPattern": "[01589]\\d{5}"
    },
    "references": {
        "sourceUrl": "http://www.itu.int/oth/T02020000AF/en"
    },
    "internationalPrefix": "00",
    "fixedLine": {
        "possibleLengths": {
            "national": "5"
        },
        "exampleNumber": 62889,
        "nationalNumberPattern": "6[2-467]\\d{3}"
    }
};

export default App;
