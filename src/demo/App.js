import React, { useEffect } from "react";
import { JSONEditor } from "../lib";
// npm run build
// to compile a production version
//npm publish to publish



const App = () => {

  useEffect(()=>{
  console.log("api loaded")
  },[])

  return (
    <div>
    <h3>Using default styles</h3>
    <JSONEditor
      data={data}
      // view="dual"
      collapsible
      onChange={this.onJsonChange}
    />
    <h3>Using customized styles</h3>
    <JSONEditor
      data={data}
      // view="dual"
      collapsible
      onChange={this.onJsonChange}
      styles={styles}
    />
  </div>
  )
  
  }

const styles = {
  dualView: {
    display: "flex",
  },
  jsonViewer: {
    borderLeft: "1px dashed white",
    lineHeight: 1.25,
    width: "50%",
    borderLeft: "1px solid lightgrey",
    margin: 10,
  },
  jsonEditor: {
    width: "50%",
    fontSize: 12,
    fontFamily: "Lucida Console, monospace",
    lineHeight: 1.25,
  },
  root: {
    fontSize: 12,
    fontFamily: "Lucida Console, monospace",
    lineHeight: 1.25,
    /*color: "#3E3D32"*/
  },
  label: {
    color: "DeepPink",
    marginTop: 3,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: "flex",
  },
  withChildrenLabel: {
    color: "DeepPink",
  },
  select: {
    borderRadius: 3,
    borderColor: "grey",
    backgroundColor: "DimGray",
    color: "khaki",
  },
  input: {
    borderRadius: 3,
    border: "1px solid #272822",
    padding: 2,
    fontFamily: "Lucida Console, monospace",
    fontSize: 12,
    backgroundColor: "gray",
    color: "khaki",
    width: "200%",
  },
  addButton: {
    cursor: "pointer",
    color: "LightGreen",
    marginLeft: 15,
    fontSize: 12,
  },
  removeButton: {
    cursor: "pointer",
    color: "magenta",
    marginLeft: 15,
    fontSize: 12,
  },
  saveButton: {
    cursor: "pointer",
    color: "green",
    marginLeft: 15,
    fontSize: 12,
  },
  builtin: {
    color: "green",
    fontSize: 12,
  },
  text: {
    color: "black",
    fontSize: 12,
  },
  number: {
    color: "purple",
    fontSize: 12,
  },
  property: {
    color: "DeepPink",
    fontSize: 12,
  },
  collapseIcon: {
    cursor: "pointer",
    fontSize: 10,
    color: "teal",
  },
};

const data = {
  mobile: {
    possibleCountryCodes: ["KE", "UG", "TZ"],
    possibleLengths: {
      national: "5",
      sub_national: "7",
    },
    exampleNumber: 40123,
    nationalNumberPattern: "4\\d{4}",
  },
  id: "AC",
  is_valid_number: true,
  generalDesc: {
    nationalNumberPattern: "[46]\\d{4}|[01589]\\d{5}",
  },
  countryCode: "247",
  uan: {
    possibleLengths: {
      national: "6",
    },
    exampleNumber: 542011,
    nationalNumberPattern: "[01589]\\d{5}",
  },
  references: {
    sourceUrl: "http://www.itu.int/oth/T02020000AF/en",
  },
  internationalPrefix: "00",
  fixedLine: {
    possibleLengths: {
      national: "5",
    },
    exampleNumber: 62889,
    nationalNumberPattern: "6[2-467]\\d{3}",
  },
};

export default App;
